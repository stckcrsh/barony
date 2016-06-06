import { Component, OnInit } from '@angular/core';

import { Post, PostService } from './shared/index';
@Component({
	providers: [PostService],
	selector: 'post-list',
	template: `
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
	`
})

export class PostListComponent implements OnInit {

	public posts: Post[];

	constructor(private postService: PostService) {}

	public ngOnInit() {
		this.postService.getAll().subscribe(tempPosts => this.posts = tempPosts);

	}

	public selectPost(post: Post) {
	}

}
