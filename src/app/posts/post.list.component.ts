import { Component, OnInit } from '@angular/core';

import { Post  } from './shared';
import { PostService } from './shared/post.service';
import { Router } from '@angular/router-deprecated';

@Component({
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
	        <td><span (click)="selectPost(post)">{{post.id}}</span></td>
	        <td>{{post.userId}}</td>
	        <td>{{post.title}}</td>
	        <td>{{post.body}}</td>
	      </tr>
	      
	    </tbody>
	  </table>
   
	`,
	providers:[PostService]
})

export class PostListComponent implements OnInit {

   posts: Post[];

   constructor(private postService: PostService, private router: Router) {}

   ngOnInit() {
      this.postService.getAll().subscribe(tempPosts => this.posts = tempPosts);

   }

   selectPost(post:Post) {
   	   this.router.navigate(['PostDetail', {id:post.id}])
    }

    createPost() {
    	this.router.navigate(['CreateNewPost']);
    }
	
}
