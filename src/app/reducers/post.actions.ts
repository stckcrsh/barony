import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Post } from '../posts/index';

@Injectable()
	/**
	 * Stores all the references and functions for the Post Actions 
	 * reference to @ngrx/example-app https://github.com/ngrx/example-app/blob/master/src/actions/book.ts
	 */
export class PostActions {
	/**
	 * Action: Loading Posts
	 * @type {String}
	 */
	public static LOAD_POSTS_COMPLETE = '[POSTS] Load Complete';

	/**
	 * Action: Create Post and the create post success messages
	 * @type {String}
	 */
	public static CREATE_POST = '[POSTS] Create';
	public static CREATE_POST_SUCCESS = '[POSTS] Create Success ';

	/**
	 * Action: Update Post
	 * @type {String}
	 */
	public static UPDATE_POST_COMPLETE = '[POSTS] Update complete';

	/**
	 * Action: Selecting a Post
	 * @type {String}
	 */
	public static SELECT_POST_COMPLETE = '[POSTS] Select Complete';


	/**
	 * Generates a new action to load in the new posts
	 * @param  {Post[]} posts Posts to be loaded
	 * @return {Action}             LOAD_POSTS_COMPLETE action
	 */
	public loadPosts(posts: Post[]): Action {
		return { payload: posts, type: PostActions.LOAD_POSTS_COMPLETE };
	};

	/**
	 * Generates a new action to create a new post in the reducer
	 * @param  {Post} post Post to be created
	 * @return {Action}             CREATE_POST_SUCCESS action
	 */
	public createPost(post: Post): Action {
		return { payload: post, type: PostActions.CREATE_POST_SUCCESS };
	};

	/**
	 * Generates a new action to start the create post effect
	 * @param  {Post} post Post to be created
	 * @return {Action}             CREATE_POST action
	 */
	public loadPost(post: Post): Action {
		return { payload: post, type: PostActions.CREATE_POST };
	};

	/**
	 * Generates a new action to update a post
	 * @param  {Post} post Post to be updated
	 * @return {Action}             UPDATE_POST_COMPLETE action
	 */
	public updatePost(post: Post): Action {
		return { payload: post, type: PostActions.UPDATE_POST_COMPLETE };
	};


	/**
	 * Generates a new action to select a post
	 * @param  {Post} post Post to be selected
	 * @return {Action}             SELECT_POST_COMPLETE action
	 */
	public selectPost(post: Post): Action {
		return { payload: post, type: PostActions.SELECT_POST_COMPLETE };
	};
}