import { Component, OnInit, Input } from '@angular/core';

import { CommentsService, Comment } from './shared/index';
import { CreateComment } from './comments.create.component';

@Component({
	selector: 'sa-comments-list',
	templateUrl: 'app/comments/comments.list.component.html',
	providers: [CommentsService],
	directives: [CreateComment]
})
export class CommentsList implements OnInit {
	@Input('post-id') postId: number;
	public comments: Comment[];

	constructor(public commentsService: CommentsService) {}

	/**
	 * Runs after the component has been initialized. Gets all the comments attached to a post
	 */
	ngOnInit() {
		this.commentsService.getCommentsByPost(this.postId)
			.subscribe(
				comments => this.comments = comments,
				error => console.log(error));
	}
}
