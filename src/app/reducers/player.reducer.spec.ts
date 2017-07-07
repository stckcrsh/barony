import { Player } from '../player/player';
import { PlayerActions } from './player.actions';
import { Shield } from '../shields/shield';

import PLAYER_REDUCER from './player.reducer';

describe('Player Reducer', () => {

	let player: Player;
	let actions: PlayerActions;

	beforeEach(() => {
		player = new Player('Mike');

		let shield1 = new Shield('Mountain', 2, 0);
		let shield2 = new Shield('Forest', 3, 1);
		let shield3 = new Shield('Plains', 4, 2);
		let shield4 = new Shield('Farmland', 5, 3);
		let shield5 = new Shield('Mountain', 2, 0);

		player.shields = [shield1, shield2, shield3, shield4, shield5];

		actions = new PlayerActions();
	});

	it('Should score shields approproately', () => {

		let newPlayer: Player = < Player > PLAYER_REDUCER(player,
			actions.scoreShields(player, player.shields));

		expect(newPlayer.score).toEqual(15);
		expect(newPlayer.shields.length).toBe(0);
	});
});
