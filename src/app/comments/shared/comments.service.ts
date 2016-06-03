import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Comment } from './comment.model';

import { AppStore } from '../../core/store';
import { GET_COMMENTS, CREATE_COMMENT} from './comments.actions';

const BASEURL = 'http://jsonplaceholder.typicode.com';
const COMMENTURL: string = '/comments';


@Injectable()
export class CommentsService {
	comments$: Observable < Array < Comment > >;

	private http: Http;

	constructor(http: Http, private store: Store<AppStore>) {
		this.http = http;
		this.comments$ = store.select('comments');
	}

	/**
	 * Gets all comments 
	 * @return {Observable<Comment[]>} returns an Observable that streams a list of comments
	 */
	getComments() {
		return this.http.get(`${BASEURL}${COMMENTURL}`)
			.map(res => res.json())
			.map(payload => ({ type: GET_COMMENTS, payload }))
			.subscribe(action => this.store.dispatch(action));
	}

	/**
	 * Gets all the comments for a post
	 * @param  {number}     postId The id of the post that these comments will come from
	 * @return {Observable<Comment[]>}        returns an Observable that streams a list of comments
	 */
	getCommentsByPost(postId: number) {
		var searchParams = new URLSearchParams();

		searchParams.set('postId', postId.toString());
		return this.http.get(`${BASEURL}${COMMENTURL}`, { search: searchParams })
			.map(res => res.json() || {})
			.map(payload => ({ type: GET_COMMENTS, payload }))
			.subscribe(action => this.store.dispatch(action));
	}

	/**
	 * Creates a new comment
	 * @param  {number}     postId  The post that this comment will be attached to
	 * @param  {Comment}    comment The comment that will be created
	 * @return {Observable<Comment>}         returns an Observable that streams single comments
	 */
	createComment(postId: number, comment: Comment) {
		let result$ = this.http.post(`${BASEURL}${COMMENTURL}`, JSON.stringify(comment))
		.map(res => {
			let newComment = res.json();
			return Object.assign({}, comment, newComment, { postId });
		})
		.map(payload => ({ type: CREATE_COMMENT, payload }));
		result$.subscribe(action => this.store.dispatch(action));
		return result$;
	}
}
