import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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

export class UserSmallDetailComponent implements OnInit  {
	@Input('user-id') userId: number;
	private user: User[];
	private userSelected: boolean = false;
	private isEditable: boolean = false;


	constructor(private userService: UserService) {

	}

	ngOnInit(){
		this.userSelected = true;
		this.userService.getUserDetail(this.userId).subscribe(	user => this.user = user, error => console.log(error));
    }

    
    editUserDetails(user:User[]){
    	if (this.isEditable) {
    			this.isEditable = false;
    		 	this.saveUserDetails(user);	
    		
    	}
    	else{    		
    		this.isEditable=true;
    	}
    }
    
    inputFocused(event:any){
		event.stopPropagation();
    }

    saveUserDetails(user:User[]){
    		//this.userService.createUser(this.userId,this.user)
			   	
    	
    }



}
