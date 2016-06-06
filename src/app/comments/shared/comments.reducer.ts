import { GET_COMMENTS, CREATE_COMMENT} from './comments.actions';
import { Comment } from './comment.model';

export const COMMENTS_REDUCER = (state: Array<Comment> = [], {type, payload}) => {
	switch (type) {
		case GET_COMMENTS:
			return payload;
		case CREATE_COMMENT:
			return [...state, payload];
		default:
			return state;
	}
};