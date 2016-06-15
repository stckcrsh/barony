import { CommentActions } from './comments.actions';
import { Comment } from './comment.model';
import { EntityStore } from '../../core/store';

/**
 * Initial state for this sliver of the store
 */
let initialState: EntityStore < Comment > = {
	ids: {},
	list: []
};

/**
 * Comments Reducer.  This is used for updating the state of the comments when there is a comment related action 
 * @type {Reducer}
 */
export const COMMENTS_REDUCER = (state = initialState, { type, payload }) => {
	switch (type) {
		case CommentActions.GET_COMMENTS:
			let newComments = payload.filter((comment: Comment) => !state.ids[comment.id]).map((comment: Comment) => comment.id);
			let newIds = payload.reduce((prev: any, comment: Comment) => Object.assign(prev, {
				[comment.id]: comment
			}), {});

			return Object.assign({}, state, { ids: Object.assign({}, state.ids, newIds), list: [...state.list, ...newComments] });
		case CommentActions.ADD_TO_COMMENTS:
			return Object.assign({}, state, {
				ids: Object.assign({}, state.ids, {
					[payload.id]: payload
				}),
				list: [...state.list, payload.id]
			});
		default:
			return state;
	}
};


/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case. Word for word from the ngrx example app 
 *  
 * https://github.com/ngrx/example-app/blob/master/src/reducers/books.ts
 */

/**
 * This selector will grab the all the comments for a particular postId
 */
export const commentsByPostId = (post_id: number) => {
	return (state$: any) => state$
		.distinctUntilChanged()
		.map((state: any) =>
			state.list.filter((comment_id: string) => {
				return state.ids[comment_id] && (state.ids[comment_id].postId === post_id);
			})
			.map((id: number) => state.ids[id])
		)
		.distinctUntilChanged();
};
