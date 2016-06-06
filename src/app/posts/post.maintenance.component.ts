import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-edit',
	templateUrl: 'app/posts/post.form.component.html'
})

export class PostMaintenanceComponent {

	private post: Post;

	constructor(public routerParam: RouteParams, public postService: PostService) {}

	get diagnostic() {
		return JSON.stringify(this.post);
	}

	public onSubmit() {
		this.postService.add(this.post).subscribe(post => this.post = post);
		console.log(this.post);
	}
}
