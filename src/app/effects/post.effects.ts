import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import { PostActions } from '../reducers/store';
import { PostService } from '../posts/index';

@Injectable()
export class PostEffects {

	/**
	 * The initialize$ observable will look for the the ngstore init event
	 * Then once it has run the init it will call out to get the initial
	 * data for the posts
	 */
	@Effect()
	public initialize$ = this.actions$
		.ofType('@ngrx/store/init')
		.switchMap(init =>
			this.postService.getAll()
		);

	/**
	 * Listens sfor the CREATE_POST action and kicks off the http request to
	 * create a new post
	 */
	@Effect()
	public createPost$ = this.actions$
		.ofType(PostActions.CREATE_POST)
		.map(action => action.payload)
		.switchMap((payload: any) =>
			this.postService.add(payload)
		);

	constructor(
		private actions$: Actions,
		private postService: PostService
	) {}
}
