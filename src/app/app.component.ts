import { Component } from '@angular/core';

@Component({

	directives: [],
	selector: 'tu-app',
	template: `
	<h1>Barony</h1>
	<router-outlet></router-outlet>
	`
})

export class AppComponent {

	// initialize our services when the app has been started
	constructor() {}

}
