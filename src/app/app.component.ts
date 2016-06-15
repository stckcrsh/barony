import { Component } from '@angular/core';
import { Header, Footer } from './tu-components/index';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, RouterLink, RouteConfig, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { UserContainerComponent, UserCreateComponent, UserSmallDetailComponent } from './users//index';

@Component({
	directives: [ROUTER_DIRECTIVES, Header, Footer, UserContainerComponent, UserCreateComponent, UserSmallDetailComponent],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<router-outlet></router-outlet>
	<tu-footer></tu-footer>`
})

@RouteConfig([
	{ component: UserContainerComponent, name: 'Users', path: '/users', useAsDefault: true },
	{ component: UserCreateComponent, name: 'Create', path: '/users/create' },
	{ component: UserSmallDetailComponent, name: 'Detail', path: '/users/:id' },
])




export class AppComponent {

}
