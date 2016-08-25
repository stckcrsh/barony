import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switchMap';
import '@ngrx/core/add/operator/select';

import { ACTION_LOGGER } from './meta-reducers/logger';
import COMMENTS_REDUCER, * as fromComments from './comments.reducer';
import POST_REDUCERS, * as fromPosts from './post.reducer';
import USER_REDUCER, * as fromUsers from './user.reducer';



/**
 * Interface that represents what the store will look like
 */
export interface AppStore {
	comments: fromComments.CommentsState;
	posts: fromPosts.PostsState;
	users: fromUsers.UsersState;
}

/**
 * Creation of the store with logging and combining the reducers
 */
export const store = StoreModule.provideStore(
	compose(
		ACTION_LOGGER,
		combineReducers)
	({
		'comments': COMMENTS_REDUCER,
		'users': USER_REDUCER,
		'posts': POST_REDUCERS
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


/**
 * ============================================================
 * 						COMMENTS SECTION
 * ============================================================
 */

/**
 * selector to get the comments state from the store
 */
export function getCommentsState() {
	return (state$: Store < AppStore > ) => state$
		.select(s => s.comments);
}

export function getCommentEntities() {
	return compose(fromComments.getCommentEntities(), getCommentsState());
}

export function getComment(id: string) {
	return compose(fromComments.getComment(id), getCommentsState());
}

export function getComments(ids: string[]) {
	return compose(fromComments.getComments(ids), getCommentsState());
}

export function getCommentsByPostId(postId: string) {
	return compose(fromComments.getCommentsByPostId(postId), getCommentsState());
}

export function getCommentsBySelectedPost() {
	return (state$: Observable < AppStore > ) =>
		state$.let(getSelectedPost())
		.switchMap(post =>
			state$.let(getCommentsByPostId(post.id)));
}


/**
 * ============================================================
 * 						POSTS SECTION
 * ============================================================
 */

/**
 * selector to get the post state from the store
 */
export function getPostsState() {
	return (state$: Store < AppStore > ) => state$
		.select(s => s.posts);
}

export function getPostEntities() {
	return compose(fromPosts.getPostEntities(), getPostsState());
}

export function getPost(id: string) {
	return compose(fromPosts.getPost(id), getPostsState());
}

export function getPosts(ids: string[]) {
	return compose(fromPosts.getPosts(ids), getPostsState());
}

export function getAllPosts() {
	return compose(fromPosts.getAllPosts(), getPostsState());
}

export function getSelectedPost() {
	return compose(fromPosts.getSelectedPost(), getPostsState());
}

export function getPostsByUserId(userId: string) {
	return compose(fromPosts.getPostsByUserId(userId), getPostsState());
}

export function getPostsBySelectedUser() {
	return (state$: Observable < AppStore > ) =>
		state$
		.let(getSelectedUser())
		.switchMap(user =>
			state$.let(getPostsByUserId(user.id)));
}


/**
 * ============================================================
 * 						USERS SECTION
 * ============================================================
 */

/**
 * selector to get the user state from the store
 */
export function getUsersState() {
	return (state$: Store < AppStore > ) => state$
		.select(s => s.users);
}

export function getUserEntities() {
	return compose(fromUsers.getUserEntities(), getUsersState());
}

export function getUser(id: string) {
	return compose(fromUsers.getUser(id), getUsersState());
}

export function getUsers(ids: string[]) {
	return compose(fromUsers.getUsers(ids), getUsersState());
}

export function getAllUsers() {
	return compose(fromUsers.getAllUsers(), getUsersState());
}

export function getSelectedUser() {
	return compose(fromUsers.getSelectedUser(), getUsersState());
}

export function getUserFromSelectedPost() {
	return (state$: Observable < AppStore > ) =>
		state$.let(getSelectedPost())
		.switchMap(post =>
			state$.let(getUser(post.userId)));

}

export { CommentActions } from './comments.actions';
export { PostActions } from './post.actions';
export { UserActions } from './user.actions';
