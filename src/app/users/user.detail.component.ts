import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import { PostListComponent, PostService, Post, postsByUserId } from '../posts/index';
import { UserService, User } from './shared/index';
import { UserSmallDetailComponent } from './user.smallDetail.component';
import { getEntity } from '../core/store';

@Component({
	directives: [PostListComponent, UserSmallDetailComponent],
	selector: 'tu-user-detail',
	template: `
	<h4><small><a (click)="goBack()">&lt; BACK</a></small></h4>
	<div class="small-detail">
		<user-small-detail (user-changed)="saveUser($event)" [user]="user$ | async"></user-small-detail>
	</div>
	<h2>Posts</h2>
	<div class="post-list">
		<post-list [posts]="posts$ | async" (selected)="selectPost($event)"></post-list>
	</div>
	`
})

export class UserDetail {
	public user$: Observable < User > ;
	public posts$: Observable < Post[] > ;

	/**
	 * Set up all the services and router pieces
	 * @param {Router}         private router      Router
	 * @param {UserService}    private userService The user service
	 * @param {PostService}    private postService The post service
	 * @param {ActivatedRoute} private route       Activated Route
	 */
	constructor(private router: Router, private userService: UserService, private postService: PostService, private route: ActivatedRoute) {
		this.user$ = this.route.params.map((params: any) => this.userService.users$.let(getEntity < User > (parseInt(params.id, 10)))).switch();
		this.posts$ = this.user$.map((user: User) => this.postService.posts$.let(postsByUserId(user.id))).switch();
	}

	/**
	 * Saves a user
	 * @param {User} user [description]
	 */
	public saveUser(user: User) {
		this.userService.updateUser(user);
	}

	public selectPost(post: Post) {
		let link = ['/posts', post.id];
		this.router.navigate(link);
	}

	public goBack() {
		this.router.navigate(['/users']);
	}
}
