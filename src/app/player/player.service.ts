import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore, PlayerActions } from '../reducers/store';
import { Player } from './player';

@Injectable()
export class PlayerService {

	constructor(private store: Store < AppStore > , private playerActions: PlayerActions) {

	}

	public deployKnights(player: Player) {
		this.store.dispatch(this.playerActions.deployKnights(player, 'space', ['k1', 'k2']));
	}
}
