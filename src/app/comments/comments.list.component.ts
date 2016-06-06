import { Component, Input} from '@angular/core';

import { Comment } from './shared/index';

@Component({
	selector: 'sa-comments-list',
	templateUrl: 'app/comments/comments.list.component.html'
})
export class CommentsList {
	@Input('comments')
	public comments: Comment[];
}
