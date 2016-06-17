import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from './shared/index';

@Component({
	selector: 'post-list',
	templateUrl: 'app/posts/post.list.component.html'
})

/**
 * Post List dumb component
 * @usage <post-list [post]="post" (selected)="eventHandler()"
 */
export class PostListComponent {

	// posts list input
	@Input()
	public posts: Post[];

	// selected event emitter
	@Output()
	public selected = new EventEmitter();

	/**
	 * click event handler for each post item
	 * @param {Post} post the selected post
	 */
	public selectPost(post: Post) {
		this.selected.next(post);
	}
}
