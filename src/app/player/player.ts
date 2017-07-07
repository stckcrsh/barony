import { Tile } from '../space/tile';
import { Shield } from '../shields/shield';

/**
 * GUID generator 
 * TODO move this into its own file
 */
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ID_LENGTH = 4;

export class Player {
	public name: string;
	public guid: string;
	public knights: any[];
	public villages: any[];
	public strongholds: any[];
	public cites: any[];
	public dep_knights: any[];
	public dep_villages: any[];
	public dep_strongholds: any[];
	public dep_cites: any[];
	public score: number;
	public tiles: Tile[];
	public shields: Shield[];

	constructor(name: string) {
		this.name = name;
		this.guid = this.generate();
		this.score = 0;

		this.knights = [];
		this.villages = [];
		this.strongholds = [];
		this.cites = [];
		this.dep_knights = [];
		this.dep_villages = [];
		this.dep_strongholds = [];
		this.dep_cites = [];

		this.tiles = [];
		this.shields = [];
	}

	private generate = function() {
		let rtn = '';
		for (let i = 0; i < ID_LENGTH; i++) {
			rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
		}
		return rtn;
	};
}
