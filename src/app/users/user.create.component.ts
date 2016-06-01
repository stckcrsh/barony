import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import { UserService, User} from './shared/index';


@Component({
	selector:'user-detail',
	templateUrl:'app/users/shared/create.user.component.html',
	providers:[UserService]
})

export class UserCreateComponent {

	public user: User = new User;
	public submitted: boolean = false;
	constructor (private userService: UserService) {
		
	}
	public onSubmit() {
		this.userService.createUser( this.user).
			subscribe(
				user => {
					this.submitted = true;
				},
				error => console.log(error));
	}

}
