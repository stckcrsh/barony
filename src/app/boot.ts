import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { StarterApp } from './starter-app.component';

bootstrap(StarterApp, [HTTP_PROVIDERS]);