export class Shield {
	public name: string;
	public score: number;
	public endGameScore: number;

	constructor(name: string, score: number, endGameScore: number) {
		this.name = name;
		this.score = score;
		this.endGameScore = endGameScore;
	}
}
