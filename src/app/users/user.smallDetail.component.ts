import { Component, OnInit, Input } from '@angular/core';
import { UserService, User } from './shared/index';


@Component({
	providers: [UserService],
	selector: 'user-small-detail',
	templateUrl: 'app/users/user.smallDetail.html'
})

export class UserSmallDetailComponent implements OnInit {
	@Input('user-id')
	public userId: number;
	private user: User[];
	private userSelected: boolean = false;
	private isEditable: boolean = false;


	constructor(private userService: UserService) {

	}

	public ngOnInit() {
		this.userSelected = true;
		this.userService.getUserDetail(this.userId).subscribe(user => this.user = user, error => console.log(error));
	}

	public editUserDetails(user: User[], event: any) {
		if (this.isEditable) {
			if (event.target.nodeName === 'INPUT') {
				this.isEditable = true;
			} else {
				this.isEditable = false;
				this.saveUserDetails(user);
			}
		} else {
			this.isEditable = true;
		}
	}

	public inputFocused(event: any) {
		event.preventDefault();
	}

	public saveUserDetails(user: User[]) {
		// this.userService.createUser(this.userId,this.user)
	}
}
