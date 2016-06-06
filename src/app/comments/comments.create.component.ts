import { Component, Output, EventEmitter } from '@angular/core';

import { Comment } from './shared/index';

@Component({
	selector: 'sa-comment-create',
	templateUrl: 'app/comments/comments.create.component.html'
})
export class CreateComment {
	@Output('create-comment')
	public createComment = new EventEmitter();

	public comment: Comment = new Comment();
	public active: boolean = true;

	constructor() {}

	public onSubmit() {
		this.createComment.emit({comment: this.comment});
		this.resetForm();
	}

	private resetForm() {
		this.comment = new Comment();
		this.active = false;

		// remove then bring back quickly
		setTimeout(() => this.active = true, 0);
	}
}