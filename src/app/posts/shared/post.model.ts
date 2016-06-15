export class Post {
	public userId: number;
	public id: number;
	public title: string;
	public body: string;

	get UserId() {
		return this.userId;
	}

	set UserId(userId: number) {
		this.userId = userId;
	}

	get Id() {
		return this.id;
	}

	set Id(id: number) {
		this.id = id;
	}

	get Title() {
		return this.title;
	}

	set Title(title: string) {
		this.title = title;
	}
	get Body() {
		return this.body;
	}

	set Body(body: string) {
		this.body = body;
	}
}
