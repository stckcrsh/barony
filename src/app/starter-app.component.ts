import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { UserListComponent,UserCreateComponent,  UserSmallDetailComponent} from './users/index';
import { HTTP_PROVIDERS } from '@angular/http'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
	template: `
	<tu-header></tu-header>
	<user-small-detail [user-id]="id"></user-small-detail>
	<tu-footer></tu-footer>
	`,
	selector: 'tu-starter-app',
	directives: [Header, Footer, UserListComponent,UserCreateComponent, UserSmallDetailComponent],
	providers: [HTTP_PROVIDERS]
})

export class StarterApp{


}