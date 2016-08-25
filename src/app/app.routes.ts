import { Routes, RouterModule } from '@angular/router';

import {
	PostListPage,
	PostDetailPage,
	PostCreatePage,
	UserCreatePage,
	UserDetailPage,
	UserListPage
} from './pages/index';
import { PostGuard } from './posts/index';
import { UserGuard } from './users/index';

const routes: Routes = [{
		path: '',
		pathMatch: 'full',
		redirectTo: '/users'
	},

	{ component: PostCreatePage, path: 'posts/create' }, {
		component: PostDetailPage,
		path: 'posts/:id',
		canActivate: [PostGuard]
	},
	{ component: PostListPage, path: 'posts' },

	{ component: UserListPage, path: 'users' },
	{ component: UserCreatePage, path: 'users/create' }, {
		component: UserDetailPage,
		path: 'users/:id',
		canActivate: [UserGuard]
	}
];

export const appRoutingProviders: any[] = [
	PostGuard,
	UserGuard
];

export const appRoutingDeclarations: any[] = [
	PostCreatePage,
	PostDetailPage,
	PostListPage,
	UserCreatePage,
	UserDetailPage,
	UserListPage
];

export const routing = RouterModule.forRoot(routes);
