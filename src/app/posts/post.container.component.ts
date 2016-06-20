import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index';
import { PostListComponent } from './post.list.Component';
import { PostDetailComponent } from './post.detail.Component';
import { getEntities } from '../core/store';


@Component({
		directives: [PostDetailComponent, PostListComponent],
		providers: [PostService],
		selector: 'posts-main',
		templateUrl: 'app/posts/post.container.component.html'
	})
/**
 * The Post Container smart component 
 * @usage <posts-main></posts-main>
 */

export class PostContainerComponent {

	// Our main stream that we pass to the post list
	public posts$: Observable < Post[] > ;

	constructor(private postService: PostService, private router: Router) {
		this.posts$ = this.postService.posts$.let(getEntities < Post > ());
	}

	/**
	 * This is the event handler for when an item is clicked
	 * @param {Post} post The selected post
	 */
	public selectPost(post: Post) {
		this.router.navigate(['PostDetail', { id: post.id }]);
	}
}
