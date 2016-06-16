import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { UserService, User, getSelectedUser, getUserEntities } from './shared/index';
import { UserListComponent } from './user.list.component';
import { UserSmallDetailComponent } from './user.smallDetail.component';
import { UserCreateComponent } from './user.create.component';
import { AppStore } from './../core/store';


@Component({
	directives: [UserListComponent, UserCreateComponent, UserSmallDetailComponent],
	providers: [UserService],
	selector: 'user-component',
	templateUrl: 'app/users/user.container.component.html'
})
/**
 * The User Container is a smart component that sets up the 
 * user list
 * user small details
 * user create
 *
 * @usage <user-component></user-component>
 */
export class UserContainerComponent {
	// This is a stream of all the user entities
	public users$: Observable < User[] > ;

	// This is a stream for the selected user
	public selectedUser$: Observable < User > ;

	constructor(public router: Router, private store: Store < AppStore > , public userService: UserService) {
		console.log('constructed');
		this.users$ = this.userService.users$.let(getUserEntities());
		this.selectedUser$ = < Observable < User >> this.userService.users$.let(getSelectedUser());

		this.userService.getUsers();
	}

	/**
	 * Event handler for the user-selected event
	 * @param {User} user Selected user
	 */
	public selectUser(user: User) {
		this.userService.selectUser(user);
	}

	/**
	 * Event Handler for the create-user event
	 * @param {User} user User to be created
	 */
	public createUser(user: User) {
		this.userService.createUser(user);
	}

	/**
	 * Event handler for the user-changed event
	 * @param {User} user User to be updated
	 */
	public saveUser(user: User) {
		this.userService.updateUser(user);
	}

}
