import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';

import { AppStore, BaronyActions } from '../reducers/store';
import { Player } from '../player/player';

@Injectable()
export class GameService {

	constructor(
		private store: Store < AppStore > ,
		private baronyActions: BaronyActions,
		private http: Http
	) {}

	public changePlayer() {
		this.store.dispatch(this.baronyActions.changePlayer());
	}

	public startGame(players: Player[]) {

		this.store.dispatch(this.baronyActions.startGame(players));
	}

	public setupGame() {

	}

	public loadGameData() {
		this.http.get('game-data.json')
			.map(res => res.json())
			.subscribe((data) => {
				console.log(data);
			});
	}
}
