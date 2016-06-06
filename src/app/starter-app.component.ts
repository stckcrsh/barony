import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { CommentsContainer } from './comments/index';

@Component({
	directives: [Header, Footer, CommentsContainer],
	selector: 'tu-starter-app',
	template: `
	<tu-header></tu-header>
	<sa-comments-container post-id="1" ></sa-comments-container>
	<tu-footer></tu-footer>
	`
})

export class StarterApp {


}