import { provideStore } from '@ngrx/store';
import { Comment, COMMENTS_REDUCER } from '../comments/index';
import { ACTION_LOGGER } from './meta-reducers/logger';

export interface AppStore {
	comments: EntityStore<Comment>;
}

export interface EntityStore<T> {
	entities: {
		[id: number]: T
	};
	ids: Array<number>;
}

export const store = provideStore({'comments': ACTION_LOGGER(COMMENTS_REDUCER)});