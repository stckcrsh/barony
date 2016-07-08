import { Component, Output, EventEmitter } from '@angular/core';

import { User } from './shared/index';

@Component({
	selector: 'user-create',
	templateUrl: 'app/users/user.create.component.html',
})

/**
 * This is the user creation form dumb component
 *
 * @usage <user-create (create-user)="eventHandler()"></user-create>
 */
export class UserCreateComponent {

	// Output emitter when a user is created
	@Output('create-user')
	public createUser = new EventEmitter();

	public user: User = new User();
	public active: boolean = true;

	constructor() {
		this.user.address = < {
			street: string;
			city: string;
			suite: string;
			zipcode: number;
			geo: {
				lat: number;
				lng: number;
			}
		} > {};
	}

	/**
	 * Form submit event handler 
	 * Emits create-user event
	 * then resets the form
	 */
	public onSubmit() {
		this.createUser.emit(this.user);
	}


}
