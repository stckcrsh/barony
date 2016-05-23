import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import StarterApp from './starter-app.component';

//bootstrap(AppComponent);
bootstrap(StarterApp, [HTTP_PROVIDERS]).catch(err => console.error(err));