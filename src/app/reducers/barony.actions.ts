import { Injectable } from '@angular/core';

import { Player } from '../player/player';

@Injectable()
export class BaronyActions {

	public static GAME_ACTIONS = {
		CHANGE_PLAYER: '[GAME] Change Player',
		START_GAME: '[GAME] Start'
	};

	public changePlayer() {
		return {
			type: BaronyActions.GAME_ACTIONS.CHANGE_PLAYER
		};
	}

	public startGame(players: Player[]) {
		return {
			type: BaronyActions.GAME_ACTIONS.START_GAME,
			payload: players
		};
	}
}
