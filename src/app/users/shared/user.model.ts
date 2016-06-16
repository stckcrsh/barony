export class User {
	public id: number;
	public name: string;
	public username: string;
	public email: string;
	public address: {
		street: string;
		city: string;
		suite: string;
		zipcode: number;
		geo: {
			lat: number;
			lng: number;
		}
	};
	public phone: number;
	public website: string;
	public company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};

	constructor() {
		this.address = < {
			street: string;
			city: string;
			suite: string;
			zipcode: number;
			geo: {
				lat: number;
				lng: number;
			}
		} > {};

		this.company = < {
			name: string;
			catchPhrase: string;
			bs: string;
		} > {};
	}
}
