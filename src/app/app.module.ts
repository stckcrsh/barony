import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders, appRoutingDeclarations } from './app.routes';
import { PostActions, UserActions, CommentActions, store } from './reducers/store';
import { CommentEffects, PostEffects, UserEffects } from './effects/index';
import { UserService } from './users/shared/index';
import { CommentsService } from './comments/shared/index';
import { PostService } from './posts/shared/index';

@NgModule({
	declarations: [
		AppComponent,
		...appRoutingDeclarations
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		EffectsModule.runAfterBootstrap(CommentEffects),
		EffectsModule.runAfterBootstrap(PostEffects),
		EffectsModule.runAfterBootstrap(UserEffects),
		routing,
		store
	],
	providers: [
		AppComponent,
		UserActions, CommentActions, PostActions,
		UserService, PostService, CommentsService,
		...appRoutingProviders
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}
