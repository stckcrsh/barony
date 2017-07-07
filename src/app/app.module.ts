import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders, appRoutingDeclarations } from './app.routes';
import { store, BaronyActions, PlayerActions } from './reducers/store';
import { GameService } from './game/game.service';
import { PlayerService } from './player/player.service';

@NgModule({
	declarations: [
		AppComponent,
		...appRoutingDeclarations
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		store
	],
	providers: [
		AppComponent,
		BaronyActions,
		PlayerActions,
		GameService,
		PlayerService,
		...appRoutingProviders
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}
