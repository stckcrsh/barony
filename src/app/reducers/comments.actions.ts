import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Comment } from '../comments/index';

@Injectable()
/**
 * Stores all the references and functions for the Comments Actions 
 * reference to @ngrx/example-app https://github.com/ngrx/example-app/blob/master/src/actions/book.ts
 */
export class CommentActions {

	/**
	 * Action: Loading comments
	 * @type {String}
	 */
	public static GET_COMMENTS = '[COMMENT] Loading Complete';

	/**
	 * Action: Adding the comment to the comments store
	 * @type {String}
	 */
	public static ADD_TO_COMMENTS = '[COMMENT] Add to Comments';

	/**
	 * Generates a new action to load in the new comments
	 * @param  {Comment[]} comments Comments to be loaded
	 * @return {Action}             GET_COMMENTS action
	 */
	public getComments(comments: Comment[]): Action {
		return {
			payload: comments,
			type: CommentActions.GET_COMMENTS
		};
	};

	/**
	 * Generates a new action to add the comment to the store
	 * @param  {Comment} comment Comment that will be added
	 * @return {Action}          ADD_TO_COMMENTS action
	 */
	public addToCollection(comment: Comment): Action {
		return {
			payload: comment,
			type: CommentActions.ADD_TO_COMMENTS
		};
	};
}