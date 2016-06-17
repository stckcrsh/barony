import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { PostService, Post } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-create',
	templateUrl: 'app/posts/post.form.component.html'
})

/**
 * Post create smart component (form to create a post)
 * @usage <post-create></post-create>
 */
export class PostCreateComponent {

	// this is the blank post we use to save this
	private post: Post;

	constructor(public router: Router, public postService: PostService) {
		this.post = new Post();
		this.post.id = 0;
	}

	/**
	 * on submit event handler
	 */
	public onSubmit() {
		this.postService.add(this.post).subscribe(post => {
			this.post = post;
		});
	}

	/**
	 * go back event handler
	 */
	public goBack() {
		window.history.back();
	}
}
