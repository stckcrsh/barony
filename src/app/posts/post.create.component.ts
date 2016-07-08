import { Component, EventEmitter, Output } from '@angular/core';

import { Post } from './shared/index';


@Component({
	selector: 'post-create',
	templateUrl: 'app/posts/post.form.component.html'
})

/**
 * Post create smart component (form to create a post)
 * @usage <post-create (create-post)="eventHadler(post)"></post-create>
 */
export class PostCreateComponent {
	// create-post event emitter
	@Output('create-post')
	public createPost = new EventEmitter();

	// this is the blank post we use to save this
	private post: Post;

	constructor() {
		this.post = new Post();
	}

	/**
	 * on submit event handler
	 */
	public onSubmit() {
		this.createPost.next(this.post);
	}
}
