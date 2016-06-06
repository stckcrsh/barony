import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Post } from './shared/post.model';
import { PostService } from './shared/post.service';


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
			this.router.navigate(['PostDetail', { id: this.post.id }]);
		});
	}

	public goBack() {
		window.history.back();
	}
}
