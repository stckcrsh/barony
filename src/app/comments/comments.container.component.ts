import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';

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

	// Set up the main comments object
	public comments$: Observable < Comment[] > ;

	private postId$: BehaviorSubject < number > ;
	@Input('post-id')
	set postId(value: string) {
		this.postId$.next(parseInt(value, 10));
	}

	/**
	 * Contructor that loads the commentsService then initializes our comments$ Stream
	 * then runs the getComments to load comments into the store
	 * @param {CommentsService} public commentsService The Comments Service
	 */
	constructor(public commentsService: CommentsService) {
		this.postId$ = < BehaviorSubject < number >> new BehaviorSubject(null);
		this.comments$ = this.postId$.map(id => this.commentsService.comments$.let(commentsByPostId(id))).switch();

		this.postId$.subscribe(res => console.log('id', res));
		this.comments$.subscribe(res => console.log('comments', res));
	}

	/**
	 * Event handler for the createComment event
	 * @param {any} event The event object which contains the comment to be created
	 */
	public createComment(event: any) {
		this.commentsService.createComment(this.postId$.getValue(), event.comment);
	}
}
