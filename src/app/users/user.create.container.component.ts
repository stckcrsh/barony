import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, User } from './shared/index';
import { UserCreateComponent } from './user.create.component';

@Component({
	directives: [UserCreateComponent],
	selector: 'tu-create-container',
	styleUrls: ['../../assets/styles/_loading.scss'],
	template: `
		<user-create (create-user)="createUser($event)" [ngClass]="{loading: loading}" [disabled]="loading"></user-create>
	`
})

export class CreateUserContainer implements OnDestroy {

	// Used to save the subscription object so it can be cleaned up on destroy
	public subscription: any;

	// flag used to tell if the form is loading 
	public loading: boolean = false;

	/**
	 * Set up the services and router
	 * @param {UserService} private userService User Service
	 * @param {Router}      private router      Router
	 */
	constructor(private userService: UserService, private router: Router) {

	}

	/**
	 * Creates a new user from the user input
	 * @param {User} user User to be created
	 */
	public createUser(user: User) {
		this.loading = true;
		this.subscription = this.userService.createUser(user).subscribe(

			// on next (success)
			() => this.router.navigate(['/posts']),

			// on error
			(err: any) => {
				console.log(err);
				this.loading = false;
			},

			// on complete
			() => this.loading = false
		);
	}

	/**
	 * Cleanup step for removing the subscription object
	 */
	public ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
