import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-detail',
	templateUrl: 'app/posts/post.form.component.html'
})

export class PostDetailComponent implements OnInit {

	private post: Post;

	private changed: boolean = false;

	private submitted: boolean = false;

	constructor(public routerParam: RouteParams, public postService: PostService) {}

	public ngOnInit() {
		let id = +this.routerParam.get('id');
		this.postService.getByID(id).subscribe(post => this.post = post);
	}

	get diagnostic() {
		return JSON.stringify(this.post);
	}

	onSubmit() {
         this.postService.update(this.post).subscribe(post => this.post = post);
         this.changed = false;
         this.submitted = true
	}

	public onEdit() {
		this.changed = true;
		this.submitted = false;
	}

	goBack() {
		window.history.back();
	}
}
