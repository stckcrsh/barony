import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { User } from '../users/index';

@Injectable()
	/**
	 * Stores all the references and functions for the Users Actions 
	 * reference to @ngrx/example-app https://github.com/ngrx/example-app/blob/master/src/actions/book.ts
	 */
export class UserActions {
	/**
	 * Action: Loading Users
	 * @type {String}
	 */
	public static LOAD_USERS_COMPLETE = '[USER] Load Users Complete';

	/**
	 * Action: Create User
	 * @type {String}
	 */
	public static CREATE_USER_COMPLETE = '[USER] Create User Complete';

	/**
	 * Action: Update User
	 * @type {String}
	 */
	public static UPDATE_USER_COMPLETE = '[USER] Update User Complete';

	/**
	 * Action: Select User
	 * @type {String}
	 */
	public static SELECT_USER_COMPLETE = '[User] SEelect User Complete';

	/**
	 * Generates a new action to load in the new users
	 * @param  {User[]} users Users to be loaded
	 * @return {Action}             LOAD_USERS_COMPLETE
	 */
	public loadUsers(users: User[]): Action {
		return { payload: users, type: UserActions.LOAD_USERS_COMPLETE };
	};


	/**
	 * Generates a new action to create a new user
	 * @param  {User}   user User to be created
	 * @return {Action}      CREATE_USER_COMPLETE
	 */
	public createUser(user: User): Action {
		return { payload: user, type: UserActions.CREATE_USER_COMPLETE };
	};

	/**
	 * Generates a new action to update a user
	 * @param  {User}   user User to be updated
	 * @return {Action}      UPDATE_USER_COMPLETE
	 */
	public updateUser(user: User): Action {
		return { payload: user, type: UserActions.UPDATE_USER_COMPLETE };
	};

	/**
	 * Generates a new action to select a user
	 * @param  {User}   user selected user
	 * @return {Action}      SELECT_USER_COMPLETE
	 */
	public selectUser(user: User): Action {
		return { payload: user, type: UserActions.SELECT_USER_COMPLETE };
	};

}
