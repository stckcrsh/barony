import { provideStore } from '@ngrx/store';
import { Comment, COMMENTS_REDUCER } from '../comments/index';
import { ACTION_LOGGER } from './meta-reducers/logger';
import { User, SELECTED_USER, USER_REDUCER } from '../users/index';

export interface AppStore {
	comments: EntityStore<Comment>;
	users: User[];
    selectedUser: User;
}

export interface EntityStore<T> {
	entities: {
		[id: number]: T
	};
	ids: Array<number>;
}
export const store = provideStore({
	'comments': ACTION_LOGGER(COMMENTS_REDUCER),
	'users': ACTION_LOGGER(USER_REDUCER),
	'selectedUser': ACTION_LOGGER(SELECTED_USER)
});