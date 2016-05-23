import { Component } from '@angular/core';

import { Header } from './tu-components/index';

@Component({
	template: `
	<tu-header></tu-header>
	<div>Some content</div>
	`,
	selector: 'tu-starter-app',
	directives: [Header]
})

export default class StarterApp{

}