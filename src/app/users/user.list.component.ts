import { Component, OnInit } from '@angular/core';
import { UserService,User } from './shared/index';
import { UserSmallDetailComponent } from './index';



@Component({
	selector:'user-list',
	templateUrl: 'app/users/user.display.component.html',
	providers:[UserService]
})

export class UserListComponent implements OnInit{
		

  errorMessage: string;
  private users:User[];

	constructor (private userService: UserService) {
		
	}	
  
    ngOnInit() { 
    	this.userService.getUsers()
    	.subscribe(
				users => this.users = users,
				error => console.log(error));
    }

   /* selectUser(user:User) {
		this.router.navigate(['user', { id: user.id }]);
    }*/



  
}
