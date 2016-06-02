import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { StarterApp } from './starter-app.component';

import { store } from './core/store';

bootstrap(StarterApp, [HTTP_PROVIDERS, store]);