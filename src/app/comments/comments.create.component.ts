import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/common';

import { CommentsService, Comment } from './shared/index';

@Component({
	selector: 'sa-comment-create',
	templateUrl: 'app/comments/comments.create.component.html',
	providers: [CommentsService]
})
export class CreateComment {
	@Input('post-id') postId: number;

	public comment: Comment = new Comment();
	public active: boolean = true;

	constructor(private commentsService: CommentsService){}

	public onSubmit() {
		// set the active flag to false (loading...)
		this.active = false;
		this.commentsService.createComment(this.postId, this.comment)
			.subscribe(
				//on next
				() => {},

				//on error
				error => {
					console.log(error);
				},

				//on complete
				() => {
					this.resetForm();
				});
	}

	private resetForm(){
		console.log('reset');
		this.comment = new Comment();
		this.active = true;
	}
}