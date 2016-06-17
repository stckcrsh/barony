import { Component } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switch';

import { Post, PostService } from './shared/index';
import { PostDetailComponent } from './post.detail.component';
import { getEntity } from '../core/store';
import { CommentsContainer } from '../comments/index';
import { User, UserService, UserSmallDetailComponent } from '../users/index';

@Component({
	directives: [PostDetailComponent, CommentsContainer, UserSmallDetailComponent],
	providers: [PostService, UserService],
	selector: 'post-maintain',
	template: `
		<user-small-detail [user]="user$ | async" (user-changed)="userChanged($event)" ></user-small-detail>
		<post-detail [post]="post$ | async" (back)="goBack()" (change-post)="postChanged($event)"></post-detail>
		<sa-comments-container [post-id]="postId$ | async" ></sa-comments-container>
	`,

})

/**
 * Post Maintain smart component 
 * Router page
 * @usage <post-maintain></post-maintain>
 */
export class PostMaintainComponent {

	// stream for the selected post
	public post$: Observable < Post > ;

	// stream for the user for this post
	public user$: Observable < User > ;

	// stream for the postId mapped from the post$
	public postId$: Observable < number > ;

	// the id grabbed from the router params
	public id: string;

	/**
	 * Setup the initial values. 
	 * Initialize the streams from their respective services
	 * @param {RouteParams}  routerParam RouterParams
	 * @param {Router}       router      Router
	 * @param {UserService}  userService User Service
	 * @param {PostService}  postService Post Service
	 */
	constructor(
		private routerParam: RouteParams,
		private router: Router,
		private userService: UserService,
		private postService: PostService) {

		this.id = this.routerParam.get('id');
		this.post$ = this.postService.posts$.let(getEntity < Post > (parseInt(this.id, 10)));
		this.user$ = this.post$.map(post => this.userService.users$.let(getEntity < User > (post.userId))).switch();

		this.postId$ = this.post$.map(post => post.id);
	}

	// event handler for the back event
	public goBack() {
		this.router.navigate(['Posts']);
	}

	// event handler for the change-post event
	public postChanged(post: Post) {
		this.postService.update(post);
	}

	// event handler for the user-changed event
	public userChanged(user: User) {
		this.userService.updateUser(user);
	}

}
