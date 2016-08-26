import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import { CommentActions } from '../reducers/store';
import { CommentsService } from '../comments/index';

@Injectable()
export class CommentEffects {

	/**
	 * The initialize$ observable will look for the the ngstore init event
	 * Then once it has run the init it will call out to get the initial
	 * data for the comments
	 */
	@Effect()
	public initialize$ = this.actions$
		.ofType('@ngrx/store/init')
		.switchMap(init =>
			this.commentsService.getComments()
		);

	/**
	 * Kicks off the create comment http request in the service when
	 * it sees the ADD_TO_COMMENTS action
	 */
	@Effect()
	public createComment$ = this.actions$
		.ofType(CommentActions.ADD_TO_COMMENTS)
		.map(action => action.payload)
		.switchMap((payload: any) =>
			this.commentsService.createComment(payload)
		);

	constructor(
		private actions$: Actions,
		private commentsService: CommentsService
	) {}
}
