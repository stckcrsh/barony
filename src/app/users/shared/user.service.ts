import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserActions } from './user.action';
import { AppStore, Selected } from '../../core/store';
import { User } from './user.model';

const BASE_URL = 'http://jsonplaceholder.typicode.com/';
const COMMENTURL = 'users/';

@Injectable()
	/**
	 * The UserService will handle the stream object to the users slice of the store.
	 * As well it will run the http requests for all the users pieces (loading, creating, updating)
	 */
export class UserService {

	/**
	 * This is the main Observable that houses the users slice of the state
	 */
	public users$: Observable < Selected < User >> ;

	/**
	 * Loads our dependencies
	 * @param {Http}        http        Http Provider
	 * @param {Store<AppStore>}          store @ngrx store
	 * @param {UserActions} userActions UserActions base class
	 */
	constructor(private http: Http, private store: Store < AppStore > , private userActions: UserActions) {
		this.users$ = < Observable < Selected < User >>> store.select('users');
	}

	/**
	 * Sends out an http reqeust to gather all the users. Then pushes that up to the store
	 * @return {Observable<User[]>} Observable of all the loaded users
	 */
	public getUsers(): Observable < User[] > {
		let result$ = this.http.get(`${BASE_URL}${COMMENTURL}`)
			.map(res => res.json());

		result$
		.map(payload => this.userActions.loadUsers(payload))
		.subscribe(action => this.store.dispatch(action));

		return result$;
	}

	/**
	 * updates or creates a user based on their id
	 * @param  {User}       user the user to be updated or created
	 * @return {Observable<User>}      User to be updated or created
	 */
	public saveUser(user: User): Observable < User > {
		return (user.id) ? this.updateUser(user) : this.createUser(user);
	}

	/**
	 * Updates a user by making an http request and when that succeeds passes it on 
	 * to the store
	 * @param  {User}       user User to be updated
	 * @return {Observable<User>}      User that was updated
	 */
	public updateUser(user: User): Observable < User > {
		let result$ = this.http.put(`${BASE_URL}${COMMENTURL}1`, JSON.stringify(user))
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
		let result$ = this.http.post(`${BASE_URL}${COMMENTURL}`, JSON.stringify(user))
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
