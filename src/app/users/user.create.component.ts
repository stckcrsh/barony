import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/common';
import { UserService, User } from './shared/index';
import { Router } from '@angular/router-deprecated';


@Component({
	selector: 'user-create',
	templateUrl: 'app/users/user.create.component.html',
	providers: [UserService]
})

export class UserCreateComponent {
	@Input('user-id') id: number;
	@Output('create-user')
	public createUser = new EventEmitter();
	public user: User = new User();

	constructor(private userService: UserService, private router: Router) {

	}

	public onSubmit() {
		this.createUser.emit({ user: this.user });
		//this.router.navigate(['Users']);		
		this.user = new User();
	}


}
