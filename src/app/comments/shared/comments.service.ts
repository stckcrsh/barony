import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Comment } from './comment.model';

const URL = 'http://jsonplaceholder.typicode.com';
const COMMENTURL: string = '/comments';


@Injectable()
export class CommentsService {
	private http: Http;

	constructor(http: Http) {
		this.http = http;
	}

	/**
	 * Gets all comments 
	 * @return {Observable<Comment[]} returns an Observable that streams a list of comments
	 */
	getComments(): Observable < Comment[] > {
		return this.http.get(URL + COMMENTURL)
			.map(res => res.json());
	}

	/**
	 * Gets all the comments for a post
	 * @param  {number}     postId The id of the post that these comments will come from
	 * @return {Observable<Comment[]>}        returns an Observable that streams a list of comments
	 */
	getCommentsByPost(postId: number): Observable < Comment[] > {
		var searchParams = new URLSearchParams();

		searchParams.set('postId', postId.toString());
		return this.http.get(URL + COMMENTURL, { search: searchParams })
			.map(res => res.json() || {});
	}

	/**
	 * Creates a new comment
	 * @param  {number}     postId  The post that this comment will be attached to
	 * @param  {Comment}    comment The comment that will be created
	 * @return {Observable<Comment>}         returns an Observable that streams single comments
	 */
	createComment(postId: number, comment: Comment): Observable < Comment > {
		return this.http.post(URL + COMMENTURL, JSON.stringify(comment))
			.map(res => {
				let newComment = res.json();
				return Object.assign({}, comment, newComment);
			});
	}
}
