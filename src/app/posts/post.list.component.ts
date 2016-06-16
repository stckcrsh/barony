import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index';
@Component({

	selector: 'post-list',
	templateUrl: 'app/posts/post.list.component.html',

})

export class PostListComponent {

	@Input()
	public posts: Post[];

	@Output()
	public selected = new EventEmitter();

	constructor(private postService: PostService, private router: Router) {
	}


}
