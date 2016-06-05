import { Component, Input } from '@angular/core';
import { UserService, User } from './shared/index';


@Component({
	providers: [UserService],
	selector: 'user-create',
	templateUrl: 'app/users/user.create.component.html'
})

export class UserCreateComponent {
	@Input('user-id')
	public userId: number;
	public user: User = new User;
	public submitted: boolean = false;

	constructor(private userService: UserService) {

	}

	public onSubmit() {
		this.userService.createUser(this.userId, this.user).
		subscribe(
			users => {
				this.submitted = true;
			},
			error => console.log(error));
	}

}
