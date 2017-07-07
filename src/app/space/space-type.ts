import { Shield } from '../shields/shield';

export class SpaceType {
	public name: string;
	public canPlaceCity: boolean;
	public canMove: boolean;
	public canStackUnits: boolean;

	private score: number;
	private endGameScore: number;

	constructor(name: string, score, endGameScore) {
		this.name = name;
		this.score = score;
		this.endGameScore = endGameScore;
	}

	public getShield(): Shield {
		return new Shield(this.name, this.score, this.endGameScore);
	}

}
