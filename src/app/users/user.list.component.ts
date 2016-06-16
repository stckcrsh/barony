import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import 'rxjs/add/operator/map';
import { UserService, User } from './shared/index';

@Component({
	providers: [UserService],
	selector: 'user-list',
	templateUrl: 'app/users/user.display.component.html'
})

/**
 * User List dumb component
 * displays a list of all the users
 *
 * @usage <user-list [users]="users" (user-selected)="eventHandler()"></user-list>
 */
export class UserListComponent {

	// User list input
	@Input('users')
	public users: User[];

	// Output event emitter
	@Output('user-selected')
	private selectedUser = new EventEmitter();

	constructor(public router: Router) {}

	/**
	 * Click event handler to select a user
	 * @param {User} user Selected User
	 */
	public selectUser(user: User) {
		this.selectedUser.next(user);
	}
}
