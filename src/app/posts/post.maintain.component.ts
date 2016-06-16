import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';

import { Post, PostService } from './shared/index';

import { PostDetailComponent } from './index'


@Component({
	directives: [PostDetailComponent],
	providers: [PostService],
	selector: 'post-maintain',
	template: `
		<post-detail [post]="post$ | async" (back)="goBack()" (save)="save($event)"></post-detail>

	`,

})

export class PostMaintainComponent implements OnInit {

	private post$: Observable < Post > ;

	constructor(public routerParam: RouteParams, public postService: PostService) {}

	public ngOnInit() {
		let id = +this.routerParam.get('id');
		this.post$ = this.postService.post$;
		this.postService.getByID(id);
		//this.post$.subscribe(post => console.log(post));
	}

	public goBack() {
		console.log("hi")
		window.history.back();
	}

	public save(post: Post) {
		console.log(typeof post);
	}

}
