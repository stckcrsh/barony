import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { PostListComponent } from './posts/index';

@Component({
	directives: [Header, Footer, PostListComponent],
	selector: 'tu-starter-app',
	template: `
	<tu-header></tu-header>
	<post-list></post-list>
	<tu-footer></tu-footer>
	`
})

export class StarterApp {


}