import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post, PostService } from './shared/index';


@Component({
	providers: [PostService],
	selector: 'post-detail',
	templateUrl: 'app/posts/post.form.component.html'
})

/**
 * Post detail dumb component
 * @usage <post-detail [post]="post" 
 *        	(back)="eventHandler()" 
 *        	(change-post)="eventHandler(post)"></post-detail>
 */
export class PostDetailComponent {

	// flag for editing the form
	public changed: boolean = false;

	// the post item that we can two way bind with
	private _post: Post;

	// setting the input post to copy the post into a new variable
	@Input('post')
	set post(value: Post) {
		this._post = Object.assign({}, value);
	}

	// return the stored private post
	get post(): Post {
		return this._post;
	}

	// back event emitter
	@Output('back')
	private back = new EventEmitter();

	// change-post event emitter
	@Output('change-post')
	private postChanged = new EventEmitter();

	// click event handler for the edit button
	public onEdit() {
		this.changed = !this.changed;
	}

	// click event handler for back button
	public goBack() {
		this.back.next({});
	}

	// event handler for the form sumission
	public onSubmit() {
		this.postChanged.next(this.post);
		this.changed = false;
	}

}
