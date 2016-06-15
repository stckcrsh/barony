import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { UserService, User } from './shared/index';
import { UserListComponent } from './user.list.component';
import { UserSmallDetailComponent } from './user.smallDetail.component';
import { UserCreateComponent } from './user.create.component';
import { Store } from '@ngrx/store';
import { AppStore } from './../core/store';


@Component({
	selector: 'user-component',
	templateUrl: 'app/users/user.container.component.html',
	providers: [UserService],
	directives: [UserListComponent, UserCreateComponent, UserSmallDetailComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserContainerComponent {
	public users: any;
	public selectedUser: any;

	constructor(public userService: UserService, public router: Router, private store: Store < AppStore > ) {
		this.users = this.userService.users$;
		this.userService.getUsers();
		this.selectedUser = < Observable < User >> store.select('selectedUser');
		this.selectedUser.subscribe((user: any) => console.log(user));
		this.users.subscribe((res: any) => console.log(res));
	}

	selectUser(user: User) {
		this.store.dispatch({ type: 'SELECT_USER', payload: user });
	}

	createUser(event:any) {
		this.userService.createUser(event.user);		
		//this.router.navigate(['Create']);
	}

	saveUser(user: User) {
		this.userService.saveUser(user);
	}

}
