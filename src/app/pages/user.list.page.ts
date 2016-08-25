import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { UserService, User, UserListComponent } from '../users/index';
import { AppStore, getAllUsers } from './../reducers/store';


@Component({
		directives: [UserListComponent],
		selector: 'user-component',
		templateUrl: 'app/pages/user.list.page.html'
	})
	/**
	 * The User Container is a smart component that sets up the 
	 * user list
	 * user small details
	 * user create
	 *
	 * @usage <user-component></user-component>
	 */
export class UserListPage {

	// This is a stream of all the user entities
	public users$: Observable < User[] > ;

	constructor(private store: Store<AppStore>, public userService: UserService, private router: Router) {
		this.users$ = this.store.let(getAllUsers());
	}

	/**
	 * Event handler for the user-selected event
	 * @param {User} user Selected user
	 */
	public selectUser(user: User) {
		let link = ['/users', user.id];
		this.userService.selectUser(user);
		this.router.navigate(link);
	}

	/**
	 * Navigate to the create user form
	 */
	public createUser() {
		let link = ['/users', '/create'];
		this.router.navigate(link);
	}

}
