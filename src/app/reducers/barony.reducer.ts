import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import '@ngrx/core/add/operator/select';

import { BaronyActions } from './barony.actions';
import { PlayerActions } from './player.actions';
import PLAYER_REDUCER from './player.reducer';
import { Player } from '../player/player';
import { Space } from '../space/space';

export interface GameState {
	playerEntities: {
		[id: string]: Player
	};
	players: string[];
	numPlayers: number;
	currentPlayer: string;
	startingPlayer: string;
	spaces: {
		[id: string]: Space
	};
};

/**
 * Initial state for this sliver of the store
 */
const initialState: GameState = {
	playerEntities: {},
	players: [],
	numPlayers: null,
	currentPlayer: null,
	startingPlayer: null,
	spaces: {}
};

/**
 * Comments Reducer.  This is used for updating the state of the comments when there is a comment related action 
 * @type {Reducer}
 */
export default function BARONY_REDUCER(state = initialState, { type, payload }) {
	switch (type) {

		/**
		 * Setting up the game
		 */
		case BaronyActions.GAME_ACTIONS.START_GAME:

			// set the players up with their pieces and stuff
			const players = payload;

			const playerEntities = players.reduce((prev, curr: Player) => {
				prev[curr.guid] = curr;
				return prev;
			}, {});

			// choose a starting player
			const currentPlayer = players[0].guid;

			// set the starting player
			const startingPlayer = currentPlayer;


			return Object.assign({},
				state, {
					players: players.map((player: Player) => player.guid),
					playerEntities: playerEntities,
					numPlayers: players.length,
					currentPlayer: currentPlayer,
					startingPlayer: startingPlayer
				}
			);
		case BaronyActions.GAME_ACTIONS.CHANGE_PLAYER:
			const currIndex = state.players.indexOf(state.playerEntities[state.currentPlayer].guid);
			const nextIndex = (currIndex + 1) >= state.numPlayers ? 0 : (currIndex + 1);

			return Object.assign({},
				state, {
					currentPlayer: state.playerEntities[state.players[nextIndex]].guid
				}
			);
		case PlayerActions.PLAYER_ACTIONS.DEPLOY_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.UPGRADE_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.KNIGHT_FLY:
		case PlayerActions.PLAYER_ACTIONS.MOVE_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.SCORE_SHIELDS:
		case PlayerActions.PLAYER_ACTIONS.UPGRADE_VILLAGE:
		case PlayerActions.PLAYER_ACTIONS.PLACE_TILE:
			const newPlayer = PLAYER_REDUCER(payload, { type, payload });
			return Object.assign({},
				state, {
					playerEntities: Object.assign({},
						state.playerEntities, {
							[newPlayer.guid]: newPlayer
						})
				}
			);
		default:
			return state;
	}
};

/**
 * This will return all the player entities from a state GameS
 * @returns {Observable<{[id:string]:Comment}>}
 */
export const getPlayerEntities = () =>
	(state$: Observable < GameState > ) =>
	state$
	.select((state: GameState) => state.playerEntities);

export const getCurrentPlayer = () =>
	(state$: Observable < GameState > ) =>
	state$
	.select(state =>
		state.playerEntities[state.currentPlayer] || null);
