import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Header, Footer } from './tu-components/index';
import { NavBar } from './navbar.component';
import { UserService } from './users/index';

@Component({

	directives: [ROUTER_DIRECTIVES, Header, Footer, NavBar],
	providers: [HTTP_PROVIDERS, UserService],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<tu-nav-bar></tu-nav-bar>
	<div class="container">
		<router-outlet></router-outlet>
	</div>
	<tu-footer></tu-footer>
	`
})

export class AppComponent {

}
