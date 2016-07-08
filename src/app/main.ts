import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { store } from './core/store';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { PostActions, PostService } from './posts/index';
import { UserActions, UserService } from './users/index';
import { CommentActions, CommentsService } from './comments/index';

bootstrap(AppComponent, [
	APP_ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	store,
	UserActions, CommentActions, PostActions, PostService, CommentsService, UserService
]);
