import { provideStore, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/skipWhile';

import { Comment, COMMENTS_REDUCER } from '../comments/index';
import { ACTION_LOGGER } from './meta-reducers/logger';
import { User, USER_REDUCER } from '../users/index';
import { Post, POST_REDUCERS } from '../posts/shared/index';


export interface AppStore {
	comments: EntityStore < Comment > ;
	posts: Selected < Post > ;
	users: Selected < User > ;
}

export interface EntityStore < T > {
	entities: {
		[id: number]: T
	};
	ids: Array < number > ;
}


export interface Selected < T > extends EntityStore < T > {
	selected: number;
}


export const store = provideStore(
	ACTION_LOGGER(combineReducers({
		'comments': COMMENTS_REDUCER,
		'users': USER_REDUCER,
		'posts': POST_REDUCERS
	}))
);

/**
 * This will return all the entities from a state EntityStore<T>
 * @returns {Observable<T[]>}
 */
export function getEntities < T > () {
	return (state$: Observable < EntityStore < T >> ) => < Observable < T[] >> state$
		.map((state: EntityStore < T > ) => < T[] > state.ids
			.map((id: number) =>
				state.entities[id]));
}

/**
 * This will return a single entity from a state EntityStore<T>
 * @returns {Observable<T>}
 */
export function getEntity < T > (id: number) {
		return (state$: Observable < EntityStore < T >> ) => < Observable < T >> state$
			.map((state: EntityStore < T > ) =>
				< T > state.entities[id])
			.skipWhile((entity: T) => entity === undefined);
	}
	/**
	 * This returns the entity for the selected user Selected<T>
	 * @returns {Observable<T>}
	 */
export function getSelected < T > () {
	return (state$: Observable < Selected < T >> ) => < Observable < T >> state$
		.map((state: Selected < T > ) =>
			< T > state.entities[state.selected]);
}
