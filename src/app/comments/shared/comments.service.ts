import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Comment } from './comment.model';
import { AppStore, EntityStore } from '../../core/store';
import { CommentActions } from './comments.actions';

import { BASEURL } from '../../core/constants';

const COMMENTURL = '/comments';


@Injectable()
	/**
	 * The CommentsService will handle the stream object to the comments slice of the store.
	 * As well it will run the http requests for all the comments pieces (loading, creating)
	 */
export class CommentsService {

	/**
	 * This is our main observable that will be the comments slice of the store
	 */
	public comments$: Observable < EntityStore < Comment > > ;

	private http: Http;

	/**
	 * Loads our dependencies on creation
	 * @param {Http}            Http Provider
	 * @param {Store<AppStore>} @ngrx store
	 */
	constructor(http: Http, private store: Store < AppStore > , private commentsActions: CommentActions) {
		this.http = http;
		this.comments$ = < Observable < EntityStore < Comment >>> store.select('comments');
	}

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
	 * Creates a new comment then sends the create comment action to the store
	 * @param  {number}     postId  The post that this comment will be attached to
	 * @param  {Comment}    comment The comment that will be created
	 * @return {Observable<Comment>}         returns an Observable that streams single comments
	 */
	public createComment(postId: number, comment: Comment) {
		let result$ = this.http.post(`${BASEURL}${COMMENTURL}`, JSON.stringify(comment))
			.map(res => {
				let newComment = res.json();
				return Object.assign({}, comment, newComment, { postId });
			})
			.map(payload => this.commentsActions.addToCollection(payload));
		result$.subscribe(action => this.store.dispatch(action));
		return result$;
	}
}
