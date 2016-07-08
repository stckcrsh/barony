import { provideRouter, RouterConfig } from '@angular/router';

import { PostRoutes } from './posts/index';
import { UserRoutes } from './users/index';

const routes: RouterConfig = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/users'
	},
	...PostRoutes,
	...UserRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
