import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
	public comments$: Observable<Array<Comment>>;

	constructor(public commentsService: CommentsService) {}

	/**
	 * Runs after the component has been initialized. Gets all the comments attached to a post
	 */
	ngOnInit() {
		this.comments$ = this.commentsService.comments$.map(res => res.filter(comment => comment.postId == this.postId));

		this.commentsService.getComments();
	}
}
