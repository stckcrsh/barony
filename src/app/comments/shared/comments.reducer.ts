import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';

import { CommentActions } from './comments.actions';
import { Comment } from './comment.model';
import { EntityStore, getEntities } from '../../core/store';

/**
 * Initial state for this sliver of the store
 */
const initialState: EntityStore < Comment > = {
	entities: {},
	ids: []
};

/**
 * Comments Reducer.  This is used for updating the state of the comments when there is a comment related action 
 * @type {Reducer}
 */
export const COMMENTS_REDUCER = (state = initialState, { type, payload }) => {
	switch (type) {

		/**
		 * Load all the comments in.  This will look for new comments that are different from the current state
		 * then add just those new comments in.
		 */
		case CommentActions.GET_COMMENTS:
			let newComments = payload.filter((comment: Comment) => !state.ids[comment.id]).map((comment: Comment) => comment.id);
			let newEntities = payload.reduce((prev: any, comment: Comment) => Object.assign(prev, {
				[comment.id]: comment
			}), {});

			return Object.assign({}, state, { entities: Object.assign({}, state.entities, newEntities), ids: [...state.ids, ...newComments] });

			/**
			 * Adding a comment to the store
			 * Because our service does not have the ability to create new ids i am generating new ones myself
			 */
		case CommentActions.ADD_TO_COMMENTS:
			// get the max id cause our service can't 
			let max = Object.keys(state.entities).reduce((prev: string, curr: string) => parseInt(curr, 10) > parseInt(prev, 10) ? curr : prev);

			// create a new comment with the id set to the max + 1
			let newPayload = Object.assign({}, payload, { id: max + 1 });
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[newPayload.id]: newPayload
				}),
				ids: [...state.ids, newPayload.id]
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
 * This selector will grab the all the comments for a particular postId and filter the list based on them
 * @returns {Observable<Comment[]>}
 */
export const commentsByPostId = (post_id: number) =>
	(state$: Observable < EntityStore < Comment >> ) => < Observable < Comment[] >>
	state$
	.let(getEntities < Comment > ())
	.map((entities: Comment[]) => entities
		.filter((comment: any) => {
			return comment.postId === post_id;
		}));
