import { Injectable } from '@angular/core';

import { Player } from '../player/player';

interface KnightMove {
	knight: any;
	start: any;
	end: any;
};

@Injectable()
export class PlayerActions {

	public static PLAYER_ACTIONS = {
		MOVE_KNIGHTS: '[PLAYER] Move knights',
		DEPLOY_KNIGHTS: '[PLAYER] Deploy knights',
		UPGRADE_KNIGHTS: '[PLAYER] Upgrade knights',
		UPGRADE_VILLAGE: '[PLAYER] Upgrade Village',
		SCORE_SHIELDS: '[PLAYER] Score shields',
		KNIGHT_FLY: '[PLAYER] Fly knights',
		PLACE_TILE: '[PLAYER] Place Tile'
	};

	public moveKnights(player: Player, knight_move1: KnightMove, knight_move2: KnightMove) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.MOVE_KNIGHTS,
			payload: {
				player: player,
				k1: knight_move1,
				k2: knight_move2
			}
		};
	}

	public deployKnights(player: Player, space: any, knights: any[]) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.DEPLOY_KNIGHTS,
			payload: {
				player: player,
				space: space,
				knights: knights
			}
		};
	}

	public upgradeKnights(player: Player, knights: any[]) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.UPGRADE_KNIGHTS,
			payload: {
				player: player,
				knights: knights
			}
		};
	}

	public upgradeSettlements(player: Player, stlmt: any) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.UPGRADE_VILLAGE,
			payload: {
				player: player,
				stlmt: stlmt
			}
		};
	}

	public scoreShields(player: Player, shields: any[]) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.SCORE_SHIELDS,
			payload: {
				player: player,
				shields: shields
			}
		};
	}

	public knightFly(player: Player, knight1: any, knight2: any, space: any) {
		return {
			type: PlayerActions.PLAYER_ACTIONS.KNIGHT_FLY,
			payload: {
				player,
				k1: knight1,
				k2: knight2,
				space: space
			}
		};
	}
}
