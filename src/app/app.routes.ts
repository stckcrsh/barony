import { Routes, RouterModule } from '@angular/router';

import {
	PostListPage,
	PostDetailPage,
	PostCreatePage,
	UserCreatePage,
	UserDetailPage,
	UserListPage
} from './pages/index';

const routes: Routes = [{
		path: '',
		pathMatch: 'full',
		redirectTo: '/users'
	},

	{ component: PostCreatePage, path: 'posts/create' },
	{ component: PostDetailPage, path: 'posts/:id' },
	{ component: PostListPage, path: 'posts' },

	{ component: UserListPage, path: 'users' },
	{ component: UserCreatePage, path: 'users/create' },
	{ component: UserDetailPage, path: 'users/:id' }
];

export const appRoutingProviders: any[] = [];

export const appRoutingDeclarations: any[] = [
	PostCreatePage,
	PostDetailPage,
	PostListPage,
	UserCreatePage,
	UserDetailPage,
	UserListPage
];

export const routing = RouterModule.forRoot(routes);
