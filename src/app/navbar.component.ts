import { Component } from '@angular/core';

@Component({
	selector: 'tu-nav-bar',
	template: `
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li><a [routerLink]="['/users']">Users</a></li>
				<li><a [routerLink]="['/posts']">Posts</a></li>
			</ul>
		</div>
	</nav>
	`
})

export class NavBar {

}