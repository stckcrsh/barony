import { Component, Input} from '@angular/core';

import { Comment } from './shared/index';

@Component({
	selector: 'sa-comments-list',
	styleUrls: ['./comments.list.component.scss'],
	templateUrl: 'app/comments/comments.list.component.html'
})
export class CommentsList {
	@Input('comments')
	public comments: Comment[];
}
