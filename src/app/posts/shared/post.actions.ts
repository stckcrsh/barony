import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Post } from './post.model';

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
	 * Action: Create Post
	 * @type {String}
	 */
	public static CREATE_POST_COMPLETE = '[POSTS] Create Complete';

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
	 * Generates a new action to create a new post
	 * @param  {Post} post Post to be created
	 * @return {Action}             CREATE_POST_COMPLETE action
	 */
	public createPost(post: Post): Action {
		return { payload: post, type: PostActions.CREATE_POST_COMPLETE };
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
