import { Player } from '../player/player';
import { BaronyActions } from './barony.actions';

import BARONY_REDUCER, * as fromBarony from './barony.reducer';

describe('Barony Reducer', () => {

	let state: fromBarony.GameState;
	let mike: Player;
	let steve: Player;
	let actions: BaronyActions;

	beforeEach(() => {
		mike = new Player('mike');
		steve = new Player('steve');
		state = {
			playerEntities: {
				[mike.guid]: mike,
				[steve.guid]: steve
			},
			players: [mike.guid, steve.guid],
			numPlayers: 2,
			currentPlayer: mike.guid,
			startingPlayer: mike.guid,
			spaces: {}
		};

		actions = new BaronyActions();
	});

	it('Should Start the game properly', () => {

		let pam = new Player('pam');
		let eric = new Player('eric');
		let magnus = new Player('magnus von magnussen');
		let newState: fromBarony.GameState = < fromBarony.GameState > BARONY_REDUCER(state,
			actions.startGame([pam, eric, magnus]));

		expect(newState.playerEntities[newState.players[0]]).toBe(pam);
		expect(newState.playerEntities[newState.players[1]]).toBe(eric);
		expect(newState.playerEntities[newState.players[2]]).toBe(magnus);
		expect(newState.numPlayers).toBe(3);
		expect(newState.playerEntities[eric.guid]).toEqual(eric);
		expect(newState.playerEntities[pam.guid]).toEqual(pam);
		expect(newState.playerEntities[magnus.guid]).toEqual(magnus);
	});
});
