import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switchMap';
import '@ngrx/core/add/operator/select';

import { ACTION_LOGGER } from './meta-reducers/logger';

import BARONY_REDUCER, * as fromBarony from './barony.reducer';

/**
 * Interface that represents what the store will look like
 */
export interface AppStore {
	'game': fromBarony.GameState;
}

/**
 * Creation of the store with logging and combining the reducers
 */
export const store = StoreModule.provideStore(
	compose(
		ACTION_LOGGER,
		combineReducers)
	({
		'game': BARONY_REDUCER
	})
);

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

// export function getCommentsState() {
// 	return (state$: Store < AppStore > ) => state$
// 		.select(s => s.comments);
// }

export function getGameState() {
	return (state$: Store < AppStore > ) => state$
		.select(s => s.game);
}

export function getCurrentPlayer() {
	return compose(fromBarony.getCurrentPlayer(), getGameState());
}


export * from './barony.actions';
export * from './player.actions';
