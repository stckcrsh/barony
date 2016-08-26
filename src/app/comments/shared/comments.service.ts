import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Comment } from './comment.model';
import { CommentActions, AppStore } from '../../reducers/store';

import { BASEURL } from '../../core/constants';

const COMMENTURL = 'comments/';


@Injectable()
	/**
	 * The CommentsService will handle the stream object to the comments slice of the store.
	 * As well it will run the http requests for all the comments pieces (loading, creating)
	 */
export class CommentsService {

	/**
	 * Loads our dependencies on creation
	 * @param {Http}            Http Provider
	 * @param {Store<AppStore>} @ngrx store
	 */
	constructor(private http: Http, private store: Store < AppStore > , private commentsActions: CommentActions) {}

	/**
	 * Gets all comments then sends the loaded comments action to the store
	 * @return {Observable<Comment[]>} returns an Observable that streams a list of comments
	 */
	public getComments() {
		let result$ = this.http.get(`${BASEURL}${COMMENTURL}`)
			.map(res => res.json());

		result$
			.map(payload => this.commentsActions.getComments(payload))
			.subscribe(action => this.store.dispatch(action));
		return result$;
	}

	/**
	 * Creates a new comment then sends the create comment success action to the store
	 * @param  {number}     postId  The post that this comment will be attached to
	 * @param  {Comment}    comment The comment that will be created
	 * @return {Observable<Comment>}         returns an Observable that streams single comments
	 */
	public createComment(comment: Comment) {
		let result$ = this.http.post(`${BASEURL}${COMMENTURL}`, JSON.stringify(comment))
			.map(res => {
				let newComment = res.json();
				return Object.assign({}, comment, newComment);
			});

		result$
			.map(payload =>
				this.commentsActions.addToCollectionSuccess(payload))
			.subscribe(action =>
				this.store.dispatch(action));
		return result$;
	}
}
