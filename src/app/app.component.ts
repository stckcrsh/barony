import { Component } from '@angular/core';
import { Post } from './posts/shared'
import { PostListComponent } from './posts/post.list.component'
import { PostDetailComponent } from './posts/post.detail.component'
import { PostCreateComponent } from './posts/post.create.component'
import { Header, Footer } from './tu-components/index';

import { HTTP_PROVIDERS } from '@angular/http'
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS} from '@angular/router-deprecated';

 
@Component({
	
	selector:"tu-app",
	template:`
	<tu-header></tu-header>
	   <router-outlet></router-outlet>
	<tu-footer></tu-footer>
	`,
	directives: [ROUTER_DIRECTIVES, Header, Footer],
	providers:[HTTP_PROVIDERS, ROUTER_PROVIDERS]

})

@RouteConfig([
	 {path:'/posts', name:"Posts", component:PostListComponent, useAsDefault:true},
	 {path:'/posts/new', name:"CreateNewPost", component:PostCreateComponent},
	 {path:'/posts/:id', name:"PostDetail", component:PostDetailComponent},

])


export class AppComponent {

}