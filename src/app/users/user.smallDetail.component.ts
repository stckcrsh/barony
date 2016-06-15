import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RouteParams } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';
import { Store } from '@ngrx/store';
import { AppStore } from './../core/store';
import { UserService, User } from './shared/index';


@Component({
    selector: 'user-small-detail',
    templateUrl: 'app/users/user.smallDetail.html',
    providers: [UserService]
})

export class UserSmallDetailComponent implements OnInit {
    public id: number;
    @Input('user') user: User;
    selectedUser: User;
    private userSelected: boolean = false;
    private isEditable: boolean = false;
    originalID: number


    constructor(private router: Router, private userService: UserService, private store: Store < AppStore > ) {

    }

    ngOnInit() {
        this.userSelected = true;

    }

    editUserDetails() {
        if (this.isEditable) {
            this.isEditable = false;
            this.userService.updateUser(this.user);
            this.router.navigate(['Users']);
        } else {
            this.isEditable = true;
        }
    }
}