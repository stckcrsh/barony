import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/common';
import { RouteParams } from '@angular/router-deprecated';

import { Post } from './shared/post.model';
import { PostService } from './shared/post.service';


@Component({
	selector:'post-edit',
	templateUrl:'app/posts/post.form.component.html',
	providers:[PostService]
})

export class PostMaintenanceComponent implements OnInit {
	
	private post: Post;

	constructor(public routerParam : RouteParams, public postService: PostService) {}
		
	ngOnInit() {
		
	}

	get diagnostic() {
		return JSON.stringify(this.post)
	}

	onSubmit() {
         this.postService.add(this.post).subscribe(post => this.post = post);
         console.log(this.post);
	}
}
