import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { PostContainerComponent, PostCreateComponent, PostDetailComponent } from './posts/index';
import { PostService } from './posts/shared/index'
import { Header, Footer } from './tu-components/index';



@Component({

	directives: [ROUTER_DIRECTIVES, Header, Footer],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, PostService],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<router-outlet></router-outlet>
	<tu-footer></tu-footer>
	`

})

@RouteConfig([
	{ component: PostContainerComponent, name: 'Posts', path: '/posts', useAsDefault: true },
	{ component: PostCreateComponent, name: 'CreateNewPost', path: '/posts/new' },
	{ component: PostDetailComponent, name: 'PostDetail', path: '/posts/:id' },
])


export class AppComponent {

}
