export class Post {
	public userId: string;
	public id: string;
	public title: string;
	public body: string;

	get UserId() {
		return this.userId;
	}

	set UserId(userId: string) {
		this.userId = userId;
	}

	get Id() {
		return this.id;
	}

	set Id(id: string) {
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
