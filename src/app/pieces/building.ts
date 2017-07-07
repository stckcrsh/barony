import { Space } from '../space/space';

export abstract class Building {
	public space: Space = null;
	public canStack: boolean;
	public canBeDestroyed: boolean;
}
