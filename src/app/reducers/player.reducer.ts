import { PlayerActions } from './player.actions';
import { Player } from '../player/player';
import { Shield } from '../shields/shield';

/**
 * Initial state for this sliver of the store
 */
const initialState: Player = new Player('AI');

/**
 * Comments Reducer.  This is used for updating the state of the comments when there is a comment related action 
 * @type {Reducer}
 */
export default function PLAYER_REDUCER(player = initialState, { type, payload }) {
	switch (type) {
		case PlayerActions.PLAYER_ACTIONS.DEPLOY_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.UPGRADE_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.KNIGHT_FLY:
		case PlayerActions.PLAYER_ACTIONS.MOVE_KNIGHTS:
		case PlayerActions.PLAYER_ACTIONS.SCORE_SHIELDS:
			let shields = payload.shields;

			// remove the shields from the player object
			let newShields = player.shields.filter((shield: Shield) =>
				shields.reduce((prev, curr) =>
					!prev || curr !== shield,
					true
				)
			);

			// calculate new score
			let score = player.score + 15;

			// return updated state
			return Object.assign({},
				player, {
					score: score,
					shields: newShields
				}
			);
		case PlayerActions.PLAYER_ACTIONS.UPGRADE_VILLAGE:
		case PlayerActions.PLAYER_ACTIONS.PLACE_TILE:
			return player;
		default:
			return player;
	}
};
