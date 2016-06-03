import { Component ,Input} from '@angular/core';
import { NgForm } from '@angular/common';
import { UserService, User} from './shared/index';


@Component({
	selector:'user-create',
	templateUrl: 'app/users/user.create.component.html',
	providers:[UserService]
})

export class UserCreateComponent {
	@Input('user-id') userId: number;
	public user: User = new User;
	public submitted: boolean = false;

	constructor (private userService: UserService) {
		
	}

	public onSubmit() {
		this.userService.createUser(this.userId,this.user).
			subscribe(
				users => {
					this.submitted = true;
				},
				error => console.log(error));
	}

}
