import { provideStore, combineReducers } from '@ngrx/store';
import { Comment, COMMENTS_REDUCER } from '../comments/index';
import { ACTION_LOGGER } from './meta-reducers/logger';
import { User, USER_REDUCER } from '../users/index';

export interface AppStore {
	comments: EntityStore < Comment > ;
	users: Selected<User>;
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
		'users': USER_REDUCER
	}))
);
