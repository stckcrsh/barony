import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Header, Footer } from './tu-components/index';
import { PostContainerComponent, PostMaintainComponent } from './posts/index';
import { PostActions } from './posts/index';
import { UserContainerComponent, UserActions } from './users/index';
import { CommentActions } from './comments/index';

@Component({

	directives: [ROUTER_DIRECTIVES, Header, Footer],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, UserActions, CommentActions, PostActions],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<router-outlet></router-outlet>
	<tu-footer></tu-footer>
	`
})

@RouteConfig([
	{ component: PostContainerComponent, name: 'Posts', path: '/posts', useAsDefault: true },
	{ component: PostMaintainComponent, name: 'PostDetail', path: '/posts/:id' },
	{ component: UserContainerComponent, name: 'Users', path: '/users' }
])


export class AppComponent {

}
