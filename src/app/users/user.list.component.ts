import { Component, OnInit } from '@angular/core';
import { UserService, User } from './shared/index';



@Component({
	providers: [UserService],
	selector: 'user-list',
	templateUrl: 'app/users/user.display.component.html'
})

export class UserListComponent implements OnInit {

	private users: User[];

	constructor(private userService: UserService) {

	}

	public ngOnInit() {
		this.userService.getUsers()
			.subscribe(
				users => this.users = users,
				error => console.log(error));
	}
}
