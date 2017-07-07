import { SpaceType } from './space-type';
import { Cube } from './cube';
import { Knight } from '../pieces/knight';

export class Space {
	public coords: Cube;

	public knights: any[] = [];
	public building: any = null;

	public type: SpaceType;

	public neighbors: Space[];

	constructor(coords: Cube, type: SpaceType) {
		this.coords = coords;
		this.type = type;
		this.neighbors = [null, null, null, null, null, null];
	}

	public getShield() {
		return this.type.getShield();
	}

	public moveKnights(knights: Knight[]) {

	}
}
