import { RouterConfig } from '@angular/router';

import { UserContainerComponent } from './user.container.component';
import { UserDetail } from './user.detail.component';
import { CreateUserContainer } from './user.create.container.component';

export const UserRoutes: RouterConfig = [
	{ component: UserContainerComponent, path: 'users' },
	{ component: CreateUserContainer, path: 'users/create' },
	{ component: UserDetail, path: 'users/:id' }
];
