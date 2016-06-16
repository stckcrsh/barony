import { Component } from '@angular/core';
import { Header, Footer } from './tu-components/index';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, RouterLink, RouteConfig, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';

import { PostContainerComponent, PostCreateComponent, PostDetailComponent, PostMaintainComponent } from './posts/index';
import { PostService } from './posts/shared/index'
import { UserContainerComponent, UserActions } from './users/index';
import { CommentActions } from './comments/index';

@Component({

	directives: [ROUTER_DIRECTIVES, Header, Footer],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, UserActions, CommentActions, PostService],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<router-outlet></router-outlet>
	<tu-footer></tu-footer>`
})

@RouteConfig([
	{ component: PostContainerComponent, name: 'Posts', path: '/posts', useAsDefault: true },
	{ component: PostMaintainComponent, name: 'PostMaintain', path: '/posts/:id' },
	{ component: UserContainerComponent, name: 'UserContainer', path: '/users' }
])


export class AppComponent {

}
