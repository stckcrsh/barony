import { Component, OnInit } from '@angular/core';

import { Post, PostService } from './shared/index';
@Component({

	providers: [PostService],
	selector:'post-list',
	template:`
	 <button type="button" (click)="createPost()" class="btn btn-default" >Create Post</button>
     <table class="table table-condensed">
	    <thead>
	      <tr>
	        <th>ID</th>
	        <th>UserID</th>
	        <th>Title</th>
	        <th>Body</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr *ngFor="let post of posts">
	        <td><button type="button" (click)="selectPost(post)" class="btn btn-link">{{post.id}}</button></td>
	        <td>{{post.userId}}</td>
	        <td>{{post.title}}</td>
	        <td>{{post.body}}</td>
	      </tr>
	    </tbody>

	  </table>
   
	`
})

export class PostListComponent implements OnInit {

	public posts: Post[];

	constructor(private postService: PostService) {}

	public ngOnInit() {
		this.postService.getAll().subscribe(tempPosts => this.posts = tempPosts);

	}

	public selectPost(post: Post) {
		this.router.navigate(['PostDetail', { id: post.id }]);
	}


    public createPost() {
    	this.router.navigate(['CreateNewPost']);
    }
	
}
