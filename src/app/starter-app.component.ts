import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { CommentsList } from './comments/index';

@Component({
	template: `
	<tu-header></tu-header>
	<sa-comments-list post-id="1"></sa-comments-list>
	<tu-footer></tu-footer>
	`,
	selector: 'tu-starter-app',
	directives: [Header, Footer, CommentsList]
})

export class StarterApp{

}