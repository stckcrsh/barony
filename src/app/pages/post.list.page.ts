import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

import { Post, PostService, PostDetailComponent, PostListComponent } from '../posts/index';
import { AppStore, getAllPosts } from '../reducers/store';


@Component({
	directives: [PostDetailComponent, PostListComponent],
	selector: 'posts-main',
	templateUrl: 'app/pages/post.list.page.html'
})

/**
 * The Post Container smart component 
 * @usage <posts-main></posts-main>
 */
export class PostListPage {

	// Our main stream that we pass to the post list
	public posts$: Observable < Post[] > ;

	constructor(private postService: PostService, private router: Router, private store: Store<AppStore>) {
		this.posts$ = this.store.let(getAllPosts());
	}

	/**
	 * This is the event handler for when an item is clicked
	 * @param {Post} post The selected post
	 */
	public selectPost(post: Post) {
		let link = ['/posts', post.id];
		this.postService.selectPost(post);
		this.router.navigate(link);
	}

	public createPost() {
		let link = ['posts', '/create'];
		this.router.navigate(link);
	}
}
