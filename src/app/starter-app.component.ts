import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { CommentsList } from './comments/index';

@Component({
	directives: [Header, Footer, CommentsList],
	selector: 'tu-starter-app',
	template: `
	<tu-header></tu-header>
	<sa-comments-list post-id="1"></sa-comments-list>
	<tu-footer></tu-footer>
	`
})

export class StarterApp {

}