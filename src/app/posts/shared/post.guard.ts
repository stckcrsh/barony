import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';

import { hasPostLoaded, AppStore } from '../../reducers/store';
@Injectable()
export class PostGuard implements CanActivate {

	constructor(private store: Store < AppStore > ) {

	}
	public canActivate() {
		return this.store.let(hasPostLoaded()).skipWhile(value => !value).take(1);
	}
}