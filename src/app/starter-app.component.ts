import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { HTTP_PROVIDERS } from '@angular/http'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
	template: `
	<tu-header></tu-header>
	<tu-footer></tu-footer>
	`,
	selector: 'tu-starter-app',
	directives: [Header, Footer],
	providers: [HTTP_PROVIDERS]
})

export class StarterApp{


}