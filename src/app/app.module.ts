import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders, appRoutingDeclarations } from './app.routes';
import { PostActions, UserActions, CommentActions, store } from './reducers/store';

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
		UserActions, CommentActions, PostActions,
		...appRoutingProviders
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}
