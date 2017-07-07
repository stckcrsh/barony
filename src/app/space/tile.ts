import { Space } from './space';
import { directions, Cube } from './cube';

/**
 * neighbors look like this
 * 
 *     (4)(5)
 *    (3)(*)(0)
 *     (2)(1)
 *     
 */
export class Tile {
	// top is the main space and what all the coords are based off of
	public top: Space;
	public left: Space;
	public right: Space;

	constructor(top: Space, left: Space, right: Space) {
		this.top = top;
		this.left = left;
		this.right = right;

		this.top.neighbors[2] = this.left;
		this.top.neighbors[1] = this.right;

		this.left.neighbors[0] = this.right;
		this.left.neighbors[5] = this.top;

		this.right.neighbors[3] = this.left;
		this.right.neighbors[4] = this.top;
	}

	public rotateCounterClockwise() {
		this.top.neighbors = [...this.top.neighbors.slice(1, 6), this.top.neighbors[0]];
		this.right.neighbors = [...this.right.neighbors.slice(1, 6), this.right.neighbors[0]];
		this.left.neighbors = [...this.left.neighbors.slice(1, 6), this.left.neighbors[0]];
	}

	public toString() {
		return `  (${(this.top.neighbors[4] && this.top.neighbors[4].type.name.charAt(0)) || 4})` +
			`(${(this.top.neighbors[5] && this.top.neighbors[5].type.name.charAt(0)) || 5})\n` +
			`(${(this.top.neighbors[3] && this.top.neighbors[3].type.name.charAt(0)) || 3})` +
			`(${this.top.type.name.charAt(0)})` +
			`(${(this.top.neighbors[0] && this.top.neighbors[0].type.name.charAt(0)) || 0})\n` +
			`  (${(this.top.neighbors[2] && this.top.neighbors[2].type.name.charAt(0)) || 2})` +
			`(${(this.top.neighbors[1] && this.top.neighbors[1].type.name.charAt(0)) || 1})\n`;
	}

	public rotateClockwise() {
		this.top.neighbors = [this.top.neighbors[5], ...this.top.neighbors.slice(0, 5)];
		this.right.neighbors = [this.right.neighbors[5], ...this.right.neighbors.slice(0, 5)];
		this.left.neighbors = [this.left.neighbors[5], ...this.left.neighbors.slice(0, 5)];
	}

	public dropTile(coord: Cube) {
		this.top.coords = this.top.coords.add(coord);
		this.top.neighbors.forEach((space: Space, idx: number) => {
			if (space && space.coords) {
				space.coords = this.top.coords.add(directions[idx]);
			}
		});
	}
}
