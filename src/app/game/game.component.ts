import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';

import { AppStore, getGameState, getCurrentPlayer } from '../reducers/store';
import { Player } from '../player/player';
import { GameService } from './game.service';
import { PlayerService } from '../player/player.service';
import { Space } from '../space/space';
import { Cube } from '../space/cube';
import { SpaceType } from '../space/space-type';
import { Tile } from '../space/tile';


@Component({
	template: `
		<button (click)="startGame()">Start</button>
		<button (click)="changePlayer()">Next</button>
		<button (click)="deployKnights()">Deploy</button>
		<button (click)="data()">Data</button>

		<button (click)="rotateTile()">Rotate</button>
		<div>{{tile.toString()}}</div>
		<div>{{currentPlayer$ | async | json}}</div>
	`
})
export class GameComponent {
	public game$: Observable < any > ;
	public currentPlayer$: Observable < any > ;
	public tile: Tile;

	constructor(
		private store: Store < AppStore > ,
		private gameService: GameService,
		private playerService: PlayerService
	) {
		this.game$ = this.store.let(getGameState());
		this.currentPlayer$ = this.store.let(getCurrentPlayer());

		let cube1 = new Cube(0, 0, 0);
		let cube2 = new Cube(0, 0, 0);
		let cube3 = new Cube(0, 0, 0);

		let mountain = new SpaceType('Mountain', 2, 0);
		let forest = new SpaceType('Forest', 3, 1);
		let plains = new SpaceType('Plains', 4, 2);

		let spaceTop = new Space(cube1, mountain);
		let spaceLeft = new Space(cube2, forest);
		let spaceRight = new Space(cube3, plains);
		console.log(Cube.CubeToId(cube1));
		console.log(Cube.CubeToId(cube1.add(new Cube(1, 1, 1))));
		console.log(Cube.IdToCube('1,1,1'));
		console.log(Cube.IdToCube('-1,+1,0'));
		this.tile = new Tile(spaceTop, spaceLeft, spaceRight);

	}

	public startGame() {

		let players: Player[] = [];

		players.push(new Player('steve'));
		players.push(new Player('mike'));

		this.gameService.startGame(players);
	}

	public changePlayer() {
		this.gameService.changePlayer();
	}

	public deployKnights() {
		this.currentPlayer$.take(1).subscribe(
			(player: Player) => this.playerService.deployKnights(player)
		);
	}

	public data() {
		this.gameService.loadGameData();
	}

	public rotateTile() {
		this.tile.rotateCounterClockwise();
		console.log(this.tile.toString());
	}
}
