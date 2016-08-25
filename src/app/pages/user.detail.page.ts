import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import { PostListComponent, Post, PostService } from '../posts/index';
import { User, UserSmallDetailComponent, UserService } from '../users/index';
import { AppStore, getSelectedUser, getPostsBySelectedUser } from '../reducers/store';

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

export class UserDetailPage {
	public user$: Observable < User > ;
	public posts$: Observable < Post[] > ;

	/**
	 * Set up all the services and router pieces
	 * @param {Router}         private router      Router
	 * @param {UserService}    private userService The user service
	 * @param {PostService}    private postService The post service
	 * @param {ActivatedRoute} private route       Activated Route
	 */
	constructor(
		private router: Router,
		private userService: UserService,
		private postService: PostService,
		private route: ActivatedRoute,
		private store: Store < AppStore >
	) {
		this.user$ = this.store.let(getSelectedUser());
		this.posts$ = this.store.let(getPostsBySelectedUser());
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
		this.postService.selectPost(post);
		this.router.navigate(link);
	}

	public goBack() {
		this.router.navigate(['/users']);
	}
}
