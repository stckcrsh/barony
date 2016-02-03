import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {CongressApp} from './congressApp';
import {HTTP_PROVIDERS} from 'angular2/http';

//bootstrap(AppComponent);
bootstrap(CongressApp, [HTTP_PROVIDERS]).catch(err => console.error(err));
