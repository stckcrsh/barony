import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { PostService, Post } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-create',
	templateUrl: 'app/posts/post.form.component.html'
})

export class PostCreateComponent implements OnInit {

	private post: Post;

	constructor(public router: Router, public postService: PostService) {}

	public ngOnInit() {
		this.post = new Post();
		this.post.id = 0;
	}

	get diagnostic() {
		return JSON.stringify(this.post);
	}

	public onSubmit() {
		this.postService.add(this.post).subscribe(post => {
			this.post = post;

		});
	}

	public goBack() {
		window.history.back();
	}
}
