import { Component } from '@angular/core';
import { PostListComponent } from './posts/post.list.component';
import { PostDetailComponent } from './posts/post.detail.component';
import { PostCreateComponent } from './posts/post.create.component';
import { Header, Footer } from './tu-components/index';

import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS } from '@angular/router-deprecated';


@Component({

	directives: [ROUTER_DIRECTIVES, Header, Footer],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
	selector: 'tu-app',
	template: `
	<tu-header></tu-header>
	<router-outlet></router-outlet>
	<tu-footer></tu-footer>
	`

})

@RouteConfig([
	{ component: PostListComponent, name: 'Posts', path: '/posts', useAsDefault: true },
	{ component: PostCreateComponent, name: 'CreateNewPost', path: '/posts/new' },
	{ component: PostDetailComponent, name: 'PostDetail', path: '/posts/:id' },
])


export class AppComponent {

}
