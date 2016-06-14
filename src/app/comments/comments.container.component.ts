import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

import { CommentsService, Comment, commentsByPostId } from './shared/index';
import { CreateComment } from './comments.create.component';
import { CommentsList } from './comments.list.component';

@Component({
	directives: [CreateComment, CommentsList],
	providers: [CommentsService],
	selector: 'sa-comments-container',
	templateUrl: 'app/comments/comments.container.component.html'
})

/**
 * Comments container is a smart component that gets all the comments for a post
 * and shoves that into the commentsList as well it creates a CreateComment form
 * that it gets create comment events from
 */
export class CommentsContainer {
	@Input('post-id')
	public _postId: string;

	// Set up the main comments object
	public comments$: Observable < Comment[] > ;

	// getter that converst the postId to an int
	get postId(): number {
		return parseInt(this._postId, 10);
	}

	/**
	 * Contructor that loads the commentsService then initializes our comments$ Stream
	 * then runs the getComments to load comments into the store
	 * @param {CommentsService} public commentsService The Comments Service
	 */
	constructor(public commentsService: CommentsService) {
		this.comments$ = <Observable<Comment[]>>this.commentsService.comments$
			.let(commentsByPostId(this.postId));

		this.commentsService.getComments();
	}

	/**
	 * Event handler for the createComment event
	 * @param {any} event The event object which contains the comment to be created
	 */
	public createComment(event: any) {
		console.log(event);
		this.commentsService.createComment(this.postId, event.comment);
	}
}
