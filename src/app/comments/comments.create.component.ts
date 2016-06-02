import { Component, Input } from '@angular/core';

import { CommentsService, Comment } from './shared/index';

@Component({
	providers: [CommentsService],
	selector: 'sa-comment-create',
	templateUrl: 'app/comments/comments.create.component.html'
})
export class CreateComment {
	@Input('post-id')
	public postId: number;

	public comment: Comment = new Comment();
	public submitted: boolean = false;

	constructor(private commentsService: CommentsService) {}

	public onSubmit() {
		this.commentsService.createComment(this.postId, this.comment).
			subscribe(
				comment => {
					this.submitted = true;
				},
				error => console.log(error));
	}
}