import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore, PostActions } from '../../reducers/store';
import { Post } from './post.model';
import { BASEURL } from '../../core/constants';

const POSTS = 'posts/';

@Injectable()
	/**
	 * The PostService will handle the stream object to the posts slice of the store.
	 * As well it will run the http requests for all the posts pieces (loading, creating, updating)
	 */
export class PostService {

	/**
	 * Loads our dependencies
	 * @param {Http}        private http        Http Provider
	 * @param {Store<AppStore>}           store Ngrx Store
	 * @param {PostActions} postActions Post Actions
	 */
	constructor(private http: Http, private store: Store < AppStore > , private postActions: PostActions) {}

	/**
	 * Sends out an http reqeust to gather all the posts. Then pushes that up to the store
	 * @return {Observable<Post[]>} Observable of all the loaded posts
	 */
	public getAll() {
		let result$ = this.http.get(`${BASEURL}${POSTS}`)
			.map(res => res.json());

		result$
			.map(payload => this.postActions.loadPosts(payload))
			.subscribe(action => this.store.dispatch(action));

		return result$;
	}

	/**
	 * Sends out an http reqeust to add a new post. Then pushes that up to the store
	 * @return {Observable<Post>} Observable of the created post
	 */
	public add(post: Post): Observable < Post > {

		let body = JSON.stringify(post);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let result$ = this.http.post(`${BASEURL}${POSTS}`, body, options)
			.map(res => res.json());

		result$
		.map(payload =>
			this.postActions.createPost(Object.assign({}, post)))
		.subscribe(action =>
			this.store.dispatch(action));

		return result$;

	}

	/**
	 * Sends out an http reqeust to update a post. Then pushes that up to the store
	 * @return {Observable<Post>} Observable of the updated post
	 */
	public update(post: Post): Observable < Post > {

		let body = JSON.stringify(post);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		// we put a one in because our service cant handle the new posts we create
		let result$ = this.http.put(`${BASEURL}${POSTS}1`, body, options)
			.map(res => res.json());

		result$
		.map(payload => this.postActions.updatePost(post))
		.subscribe(action => this.store.dispatch(action));

		return result$;

	}

	public selectPost(post: Post) {
		this.store.dispatch(this.postActions.selectPost(post));
	}
}
