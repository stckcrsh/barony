import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import { UserActions } from '../reducers/store';
import { UserService } from '../users/index';

@Injectable()
export class UserEffects {

	/**
	 * The initialize$ observable will look for the the ngstore init event
	 * Then once it has run the init it will call out to get the initial
	 * data from the posts, users and comments
	 */
	@Effect()
	public initialize$ = this.actions$
		.ofType('@ngrx/store/init')
		.switchMap(init =>
			this.userService.getUsers()
		);

	/**
	 * Listens for the CREATE_USER action and kicks off the create user
	 * service.
	 */
	@Effect()
	public createUser$ = this.actions$
		.ofType(UserActions.CREATE_USER)
		.map(action => action.payload)
		.switchMap(payload =>
			this.userService.createUser(payload)
		);

	constructor(
		private actions$: Actions,
		private userService: UserService
	) {}
}
