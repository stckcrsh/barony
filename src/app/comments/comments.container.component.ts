import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CommentsService, Comment, commentsByPostId } from './shared/index';
import { CreateComment } from './comments.create.component';
import { CommentsList } from './comments.list.component';

@Component({
	directives: [CreateComment, CommentsList],
	providers: [CommentsService],
	selector: 'sa-comments-container',
	templateUrl: 'app/comments/comments.container.component.html'
})
export class CommentsContainer implements OnInit {
	@Input('post-id')
	public _postId: string;
	public comment: Comment;
	public comments$: Observable<{}> ;

	get postId(): number {
		return parseInt(this._postId, 10);
	}

	constructor(public commentsService: CommentsService) {
		this.commentsService.getComments();
	}

	/**
	 * Runs after the component has been initialized. Gets all the comments attached to a post
	 */
	public ngOnInit() {
		this.comments$ = this.commentsService.comments$
			.let(commentsByPostId(this.postId));

		this.comments$.subscribe((next: any) => {
			console.log('next', next);
		});

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
