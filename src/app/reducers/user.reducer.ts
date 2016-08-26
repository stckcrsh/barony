import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import '@ngrx/core/add/operator/select';

import { User } from '../users/shared/index';
import { Selected, getSelected } from './entityStore';
import { UserActions } from './user.actions';

/**
 * Initial state implements the Selected<User> interface
 * this is a child of the EntityStore<> Interface that adds
 * in the selected variable
 */
export interface UsersState extends Selected < User > {
	entities: {
		[id: string]: User
	};
	ids: string[];
	selected: string;
	loaded: boolean;
}

const initialState: UsersState = {
	entities: {},
	ids: [],
	selected: null,
	loaded: false
};

/**
 * Unnecessary code used to supplement the shortcomings of the json service we use
 */
let ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let ID_LENGTH = 4;

let generate = function() {
	let rtn = '';
	for (let i = 0; i < ID_LENGTH; i++) {
		rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
	}
	return rtn;
};


/**
 * Users Reducer.  This is used for updating the state of the users when there is a user related action 
 * @type {Reducer}
 */
export default function USER_REDUCER(state: Selected < User > = initialState, { type, payload }) {
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
				ids: [...state.ids, ...newUsers],
				loaded: true
			});

			/**
			 * Creates a new users and sets its id to a guid
			 */
		case UserActions.CREATE_USER_SUCCESS:
			let newPayload = Object.assign({}, payload, { id: generate() });
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
 * This will return all the entities from a state UsersState
 * @returns {Observable<{[id:string]:User}>}
 */
export const getUserEntities = () =>
	(state$: Observable < UsersState > ) =>
	state$.select(state =>
		state.entities);

/**
 * This will return a single entity from a state Selected<User>
 * @returns {Observable<User>}
 */
export const getUser = (userId: string) =>
	(state$: Observable < UsersState > ) =>
	state$.select(state =>
		state.entities[userId]);

/**
 * This returns the Users with the given ids
 * @returns {Observable<User[]>}
 */
export const getUsers = (userIds: string[]) =>
	(state$: Observable < UsersState > ) =>
	state$
	.let(getUserEntities())
	.map(entities =>
		userIds.map((id: string) =>
			entities[id]));

/**
 * Get all the users in a list
 * @type {Observable<User[]>}
 */
export const getAllUsers = () =>
	(state$: Observable < UsersState > ) =>
	state$
	.map(state =>
		state.ids.map(id =>
			state.entities[id]));

/**
 * Returns a boolean to show if the users have loaded
 * @type {Observable<Boolean>}
 */
export const hasLoaded = () =>
	(state$: Observable < UsersState > ) =>
	state$.select(state =>
		state.loaded);

/**
 * This returns the entity for the selected user Selected<User>
 * @returns {Observable<User>}
 */
export const getSelectedUser = () =>
	(state$: Observable < UsersState > ) =>
	state$.let(getSelected < User > ());
