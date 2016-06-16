import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostListComponent } from './post.list.Component';
import { PostDetailComponent } from './post.detail.Component';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router-deprecated';

import { Post, PostService } from './shared/index'


@Component({
	directives: [PostDetailComponent, PostListComponent],
	selector: 'posts-main',
	templateUrl: 'app/posts/post.container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,

})

export class PostContainerComponent implements OnInit {

	posts$: Observable < Post[] > ;


	constructor(private postService: PostService, private router: Router) {}

	public ngOnInit() {
		this.posts$ = this.postService.posts$;
		this.postService.getAll();
	}

	public selectPost(post: Post) {
		this.router.navigate(['PostMaintain', { id: post.id }]);
	}
}
