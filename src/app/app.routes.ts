import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
/**
 * All the routes for our application
 */
const routes: Routes = [{
		path: '',
		pathMatch: 'full',
		redirectTo: '/game'
	},
	{ path: 'game', component: GameComponent}
];

/**
 * A listing of all the route providers (Guards and such)
 * @type {any[]}
 */
export const appRoutingProviders: any[] = [
];

/**
 * A list of all the component declarations
 */
export const appRoutingDeclarations: any[] = [
];

export const routing = RouterModule.forRoot(routes);
