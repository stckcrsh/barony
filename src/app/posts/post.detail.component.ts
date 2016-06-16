import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { RouteParams } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-detail',
	templateUrl: 'app/posts/post.form.component.html'
})

export class PostDetailComponent {

	@Input()
	public post: Post;

	@Output()
	public back = new EventEmitter();



}
