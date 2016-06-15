import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { COMMENTS_REDUCER, CommentActions } from './comments/index';
import { ACTION_LOGGER } from './core/meta-reducers/index';

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	provideStore({ 'comments': ACTION_LOGGER(COMMENTS_REDUCER) }),
	CommentActions
]);
