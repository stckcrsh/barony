import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import { Post } from './shared/post.model';
import { PostService } from './shared/post.service';


@Component({
	selector:'post-create',
	templateUrl:'app/posts/post.form.component.html',
	providers:[PostService]
})

export class PostCreateComponent implements OnInit {
	
	private post: Post;

	private changed: boolean = true;

	constructor(public router : Router, public postService: PostService) {}
		
	ngOnInit() {
		this.post = new Post();
		this.post.id = 0;
	}

	get diagnostic() {
		return JSON.stringify(this.post)
	}

	onSubmit() {
         this.postService.add(this.post).subscribe(post => {
         	this.post = post;
            this.router.navigate(['PostDetail', {id:this.post.id}])
         });
        
         
	}

	goBack() {
		window.history.back();
	}
}
