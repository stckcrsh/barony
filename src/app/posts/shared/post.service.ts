import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppStore } from '../../core/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Post, GET_POSTS, SELECT_POSTS } from './index';
import { BASEURL } from '../../core/constants';

const POSTS: string = '/posts';
const BY_ID: string = '/posts/';
const UPDATE_POST: string = 'http://jsonplaceholder.typicode.com/posts/{1}';
const CREATE_POST: string = 'http://jsonplaceholder.typicode.com/posts';



@Injectable()
export class PostService {

	posts$: Observable < Post[] > ;
	post$: Observable < Post > ;

	constructor(private http: Http, private _store: Store < AppStore > ) {
		this.posts$ = < Observable < Post[] >> _store.select("posts");
		this.post$ = < Observable < Post >> _store.select("post");
	}

	public getAll() {
		this.http.get(`${BASEURL}${POSTS}`)
			.map(res => res.json())
			.map(payload => ({ type: GET_POSTS, payload }))
			.subscribe(action => this._store.dispatch(action));
	}

	public getByID(id: number) {
		 this.http.get(`${BASEURL}${BY_ID}${id}`)
			.map(res => res.json())
			.map(payload => ({type: SELECT_POSTS, payload}))
			.subscribe(action => this._store.dispatch(action));
	}

	public add(post: Post): Observable < Post > {

		let body = JSON.stringify(post);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(CREATE_POST, body, options).map(this.extractData).catch(this.handleError);

	}

	public update(post: Post): Observable < Post > {

		let body = JSON.stringify(post);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.put(UPDATE_POST.replace('{1}', post.id.toString()), body, options).map(this.extractData).catch(this.handleError);

	}



	private extractData(res: Response) {

		if (res.status < 200 || res.status >= 300) {
			throw new Error('Response Status :' + res.status);
		}
		let body = res.json();
		return body;
	}

	private handleError(error: any) {
		console.log(error);
		let errorMsg = error.message;
		console.log(errorMsg);
		return Observable.throw(errorMsg);
	}
}
