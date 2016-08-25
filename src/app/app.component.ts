import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { NavBar } from './navbar.component';
import { UserService } from './users/shared/index';
import { CommentsService } from './comments/shared/index';
import { PostService } from './posts/shared/index';

@Component({

	directives: [Header, Footer, NavBar],
	providers: [UserService, PostService, CommentsService],
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
	constructor(userService: UserService, postService: PostService, commentsService: CommentsService){}

}
