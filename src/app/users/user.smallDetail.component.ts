import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from './shared/index';

@Component({
	selector: 'user-small-detail',
	templateUrl: 'app/users/user.smallDetail.html'
})

/**
 * User small detail dumb component
 *
 * @usage <user-small-detail [user]="user" (user-changed)="eventHandler"></user-small-detail>
 */
export class UserSmallDetailComponent {
	public isEditable: boolean = false;
	private _user: User;

	// user-changed event emitter
	@Output('user-changed')
	private userChanged = new EventEmitter();

	// user input that copies the user into the _user private variable
	@Input('user')
	set user(value: User) {
		this._user = Object.assign({}, value);
	}

	get user(): User {
		return this._user;
	}

	// click handler to make the table editable
	public editUserDetails() {
		if (!this.isEditable) {
			this.isEditable = true;
		}
	}

	// event handler for when the changes are saved
	public updateUser() {
		this.userChanged.next(this._user);
		this.isEditable = false;
	}

}
