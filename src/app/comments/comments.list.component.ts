import { Component, Input} from '@angular/core';

import { Comment } from './shared/index';

@Component({
	selector: 'sa-comments-list',
	styleUrls: ['app/comments/comments.list.component.css'],
	templateUrl: 'app/comments/comments.list.component.html'
})
export class CommentsList {
	@Input('comments')
	public comments: Comment[];
}
