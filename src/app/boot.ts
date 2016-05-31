import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { provideStore } from '@ngrx/store';

import { StarterApp } from './starter-app.component';
import { comments, selectedComment } from './comments.reducer';

bootstrap(StarterApp, [HTTP_PROVIDERS, provideStore({comments, selectedComment})]);