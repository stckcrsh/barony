import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { EntityStore, Selected } from '../../core/store';
import { UserActions } from './user.action';

/**
 * Initial state implements the Selected<User> interface
 * this is a child of the EntityStore<> Interface that adds
 * in the selected variable
 */
const initialState: Selected < User > = {
	entities: {},
	ids: [],
	selected: 0
};

/**
 * Users Reducer.  This is used for updating the state of the users when there is a user related action 
 * @type {Reducer}
 */
export const USER_REDUCER = (state: EntityStore < User > = initialState, { type, payload }) => {
	switch (type) {

		/**
		 * Loads in all the new users that are different from the previous stater
		 */
		case UserActions.LOAD_USERS_COMPLETE:

			let newUsers = payload.filter((user: User) => !state.ids[user.id]).map((user: User) => user.id);
			let newEntities = payload.reduce((prev: any, user: User) => Object.assign(prev, {
				[user.id]: user
			}), {});

			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, newEntities),
				ids: [...state.ids, ...newUsers]
			});

		/**
		 * Creates a new users and sets its id to the maxId + 1
		 */
		case UserActions.CREATE_USER_COMPLETE:
			// get the max id cause our service can't 
			let max = parseInt(Object.keys(state.entities).reduce(
				(prev: string, curr: string) => parseInt(curr, 10) > parseInt(prev, 10) ? curr : prev), 10);

			// create a new user with the id set to the max + 1
			let newPayload = Object.assign({}, payload, { id: max + 1 });
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[newPayload.id]: newPayload
				}),
				ids: [...state.ids, newPayload.id]
			});

		/**
		 * Updates a current user by changing its value in the entities field
		 */
		case UserActions.UPDATE_USER_COMPLETE:
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[payload.id]: payload
				}),
				ids: [...state.ids]
			});

		/**
		 * Changes the selected user based on the user that is sent
		 */
		case UserActions.SELECT_USER_COMPLETE:
			return Object.assign({}, state, { selected: payload.id });
		default:
			return state;
	}
};


/**
 * This will return all the entities from a state Selected<User>
 * @returns {Observable<User[]>}
 */
export const getUserEntities = () =>
	(state$: Observable < Selected < User >> ) => < Observable < User[] >> state$
	.map((state: Selected < User > ) => < User[] > state.ids.map((id: number) => state.entities[id]));

/**
 * This will return a single entity from a state Selected<User>
 * @returns {Observable<User>}
 */
export const getUserEntity = (userId: number) =>
	(state$: Observable < Selected < User >> ) => < Observable < User >> state$
	.map((state: Selected < User > ) => < User > state.entities[userId]);

/**
 * This returns the entity for the selected user Selected<User>
 * @returns {Observable<User>}
 */
export const getSelectedUser = () =>
	(state$: Observable < Selected < User >> ) => < Observable < User >> state$
	.map((state: Selected < User > ) => < User > state.entities[state.selected]);
