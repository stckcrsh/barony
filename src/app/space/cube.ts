/**
 * Directions around a hex
 *
 *     (4)(5)
 *    (3)(*)(0)
 *     (2)(1)
 * 
 */
export class Cube {
	public x: number;
	public y: number;
	public z: number;

	public static CubeToId(cube: Cube) {
		return cube.toString();
	}

	public static IdToCube(id: string): Cube {
		let split = id.split(',').map((str: string) => parseInt(str, 10));
		return new Cube(split[0], split[1], split[2]);
	}

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public add(direction: Cube): Cube {
		return new Cube(this.x + direction.x, this.y + direction.y, this.z + direction.z);
	}

	public toString() {
		return `${this.x},${this.y},${this.z}`;
	}
}


export const directions = {
	0: new Cube(+1, -1, 0),
	1: new Cube(+1, 0, -1),
	2: new Cube(0, +1, -1),
	3: new Cube(-1, +1, 0),
	4: new Cube(-1, 0, +1),
	5: new Cube(0, -1, +1)
};
