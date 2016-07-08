import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switch';

import { Post, PostService } from './shared/index';
import { PostDetailComponent } from './post.detail.component';
import { getEntity } from '../core/store';
import { CommentsContainer } from '../comments/index';
import { User, UserSmallDetailComponent } from '../users/index';
import { UserService } from '../users/shared/user.service';

@Component({
	directives: [PostDetailComponent, CommentsContainer, UserSmallDetailComponent],
	selector: 'post-maintain',
	template: `
		<h4><small><a (click)="goBack()">&lt; BACK</a></small></h4>
		<div class="row">
			<user-small-detail [user]="user$ | async" (user-changed)="userChanged($event)" ></user-small-detail>
			<post-detail [post]="post$ | async" (back)="goBack()" (change-post)="postChanged($event)"></post-detail>
			<sa-comments-container [post-id]="postId$ | async" ></sa-comments-container>
		</div>
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

	/**
	 * Setup the initial values. 
	 * Initialize the streams from their respective services
	 * @param {ActivatedRoute} route The Activated Route 
	 * @param {UserService}  userService User Service
	 * @param {PostService}  postService Post Service
	 */
	constructor(
		private userService: UserService,
		private postService: PostService,
		private route: ActivatedRoute
	) {

		this.post$ = this.route.params.map((params: any) => this.postService.posts$.let(getEntity < Post > (parseInt(params.id, 10)))).switch();
		this.user$ = this.post$.map(post => this.userService.users$.let(getEntity < User > (post.userId))).switch();

		this.postId$ = this.post$.map(post => post.id);
	}

	// event handler for the back event
	public goBack() {
		window.history.back();
	}

	// event handler for the change-post event
	public postChanged(post: Post) {
		this.postService.update(post);
	}

	// event handler for the user-changed event
	public userChanged(user: User) {
		this.userService.updateUser(user);
	}

	public save(post: Post) {
		console.log(typeof post);
	}

}
