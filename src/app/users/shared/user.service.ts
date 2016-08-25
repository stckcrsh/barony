import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppStore, UserActions } from '../../reducers/store';
import { User } from './user.model';

const BASE_URL = 'http://jsonplaceholder.typicode.com/';
const USERS_URL = 'users/';

@Injectable()
/**
 * The UserService will handle the stream object to the users slice of the store.
 * As well it will run the http requests for all the users pieces (loading, creating, updating)
 */
export class UserService {

	/**
	 * Loads our dependencies
	 * @param {Http}        http        Http Provider
	 * @param {Store<AppStore>}          store @ngrx store
	 * @param {UserActions} userActions UserActions base class
	 */
	constructor(private http: Http, private store: Store < AppStore > , private userActions: UserActions) {
		this.getUsers();
	}

	/**
	 * Sends out an http reqeust to gather all the users. Then pushes that up to the store
	 * @return {Observable<User[]>} Observable of all the loaded users
	 */
	public getUsers(): Observable < User[] > {
		let result$ = this.http.get(`${BASE_URL}${USERS_URL}`)
			.map(res => res.json());

		result$
		.map(payload => this.userActions.loadUsers(payload))
		.subscribe(action => this.store.dispatch(action));

		return result$;
	}

	/**
	 * Updates a user by making an http request and when that succeeds passes it on 
	 * to the store
	 * @param  {User}       user User to be updated
	 * @return {Observable<User>}      User that was updated
	 */
	public updateUser(user: User): Observable < User > {
		let result$ = this.http.put(`${BASE_URL}${USERS_URL}1`, JSON.stringify(user))
			.map(res => res.json());

		result$
		.map((payload: User) => this.userActions.updateUser(user))
		.subscribe(action => this.store.dispatch(action));

		return result$;
	}

	/**
	 * Creates a new user by making an http request and on cussess passes it on
	 * to the store
	 * @param  {User}       user User to be created
	 * @return {Observable}      User that was created
	 */
	public createUser(user: User): Observable < User > {
		let result$ = this.http.post(`${BASE_URL}${USERS_URL}/fadsfdsafsd`, JSON.stringify(user))
			.map(res => res.json());

		result$
		.map(payload => this.userActions.createUser(Object.assign({}, user, payload)))
		.subscribe(action => this.store.dispatch(action));

		return result$;
	}

	/**
	 * Changes the selected user and passes it to the store
	 * @param {User} user The user to be selected
	 */
	public selectUser(user: User) {
		this.store.dispatch(this.userActions.selectUser(user));
	}
};
