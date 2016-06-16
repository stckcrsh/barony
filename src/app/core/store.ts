import { provideStore } from '@ngrx/store';
import { Comment, COMMENTS_REDUCER } from '../comments/index';
import { ACTION_LOGGER } from './meta-reducers/logger';
import { Post, POST_REDUCERS, SELECTED_POST } from '../posts/shared/index'
 

export interface AppStore {
	comments: EntityStore<Comment>;
	posts: Post[];
	selectedPost: Post;
}

export interface EntityStore<T> {
	ids: {};
	list: Array<T>;
}

export const store = provideStore({'comments': ACTION_LOGGER(COMMENTS_REDUCER), 'posts': ACTION_LOGGER(POST_REDUCERS)});