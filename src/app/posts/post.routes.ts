import { RouterConfig } from '@angular/router';

import { PostContainerComponent } from './post.container.component';
import { PostMaintainComponent } from './post.maintain.component';
import { PostCreateContainer } from './post.create.container.component';


export const PostRoutes: RouterConfig = [
	{ component: PostCreateContainer, path: 'posts/create' },
	{ component: PostMaintainComponent, path: 'posts/:id' },
	{ component: PostContainerComponent, path: 'posts' }
];
