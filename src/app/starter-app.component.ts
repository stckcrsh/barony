import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';

@Component({
	template: `
	<tu-header></tu-header>
	<div>Some content</div>
	<tu-footer></tu-footer>
	`,
	selector: 'tu-starter-app',
	directives: [Header, Footer]
})

export class StarterApp{

}