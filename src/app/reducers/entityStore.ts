import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/skipWhile';

export interface EntityStore < T > {
	entities: {
		[id: string]: T
	};
	ids: Array < string > ;
}

export interface Selected < T > extends EntityStore < T > {
	selected: string;
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case. 
 * 
 * Word for word from the ngrx example app 
 * https://github.com/ngrx/example-app/blob/master/src/reducers/books.ts
 */

/**
 * This will return all the entities from a state EntityStore<T>
 * @returns {Observable<T[]>}
 */
export function getEntities < T > () {
	return (state$: Observable < EntityStore < T >> ) => < Observable < T[] >> state$
		.map((state: EntityStore < T > ) => < T[] > state.ids
			.map((id: string) =>
				state.entities[id]));
}

/**
 * This will return a single entity from a state EntityStore<T>
 * @returns {Observable<T>}
 */
export function getEntity < T > (id: string) {
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
	return (state$: Observable < Selected < T >> ) =>
		< Observable < T >> state$.select(state =>
			state.entities[state.selected] || state.selected);
}
