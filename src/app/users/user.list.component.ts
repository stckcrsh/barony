import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import 'rxjs/add/operator/map';
import { UserService, User } from './shared/index';

@Component({
	selector: 'user-list',
	templateUrl: 'app/users/user.display.component.html',
	providers: [UserService]
})

export class UserListComponent {
	@Input() users: User[];
	@Output() selected = new EventEmitter();

	constructor(public router: Router) {}

	editUser(user: User) {
		//this.router.navigate(['Detail', { id: user.id }]);
	}
}
