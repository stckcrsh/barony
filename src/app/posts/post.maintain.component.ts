import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';

import { Post, PostService } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-detail',
	templateUrl: 'app/posts/post.form.component.html'
})

export class PostMaintainComponent implements OnInit {

	private post$: Observable < Post > ;

	constructor(public routerParam: RouteParams, public postService: PostService) {}

	public ngOnInit() {
		let id = +this.routerParam.get('id');
		this.post$ = this.postService.post$;
	}
}
