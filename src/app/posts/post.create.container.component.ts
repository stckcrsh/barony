import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { PostCreateComponent } from './post.create.component';
import { Post, PostService } from './shared/index';

@Component({
	directives: [PostCreateComponent],
	selector: 'tu-create-post-container',
	template: `
		<post-create (create-post)="createPost($event)"></post-create>
	`
})
export class PostCreateContainer implements OnDestroy {

	// The subscription object used to clean up our subscription on destroy
	public subscription: any;

	constructor(private postService: PostService, private router: Router) {}

	/**
	 * Create a new Post from the provided post then navigate away on success
	 * @param {Post} post Post to be created
	 */
	public createPost(post: Post) {
		this.subscription = this.postService.add(post).subscribe(
			() => this.router.navigate(['/posts'])
		);
	}

	/**
	 * clean up the subscription on destruction
	 */
	public ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
