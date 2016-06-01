import { Component } from '@angular/core';

import { Header, Footer } from './tu-components/index';
import { UserListComponent , UserCreateComponent } from './users/index';

@Component({
	template: `
	<tu-header></tu-header>
	<user-list></user-list>
	<user-detail></user-detail>
	<tu-footer></tu-footer>
	`,
	selector: 'tu-starter-app',
	directives: [Header, Footer , UserListComponent, UserCreateComponent]
})

export class StarterApp{

}