import { Component, OnInit } from '@angular/core';
import { UserService,User } from './shared/index';


@Component({
	selector:'user-list',
	templateUrl:'app/users/shared/display.user.component.html',
	providers:[UserService]
})

export class UserListComponent implements OnInit{
	
  errorMessage: string;
  private users:User[];
  userUrl = 'http://jsonplaceholder.typicode.com/users';

	constructor (private userService: UserService) {
		
	}

	
  
    ngOnInit() { 
    	this.userService.getUsers()
    	.subscribe(
				users => this.users = users,
				error => console.log(error));
    }

  
}
