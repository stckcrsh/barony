import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/common';
import { RouteParams } from '@angular/router-deprecated';

import { Post } from './shared/post.model';
import { PostService } from './shared/post.service';


@Component({
	selector:'post-detail',
	templateUrl:'app/posts/post.form.component.html',
	providers:[PostService]
	
})

export class PostDetailComponent implements OnInit{
	
	private post: Post;

	private changed: boolean = false;

	private submitted:boolean = false;

	private successMsg:string="Success";

	constructor(public routerParam : RouteParams, public postService: PostService) {}
	
	ngOnInit() {
		let id = +this.routerParam.get('id');
		this.postService.getByID(id).subscribe(post => this.post = post);
	}

	get diagnostic() {
		return JSON.stringify(this.post)
	}

	onSubmit() {
         this.postService.add(this.post).subscribe(post => this.post = post);
         this.changed = false;
         this.submitted = true
	}

	onEdit() {
		this.changed = true;
		this.submitted = false;
	}
}
