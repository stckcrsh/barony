import { Observable } from 'rxjs/Observable';

import { PostActions } from './post.actions';
import { Post } from './post.model';
import { Selected, getEntities } from '../../core/store';


/**
 * Initial state for this sliver of the store
 */
const initialState: Selected < Post > = {
	entities: {},
	ids: [],
	selected: null
};

/**
 * Posts Reducer.  This is used for updating the state of the posts when there is a post related action 
 * @type {Reducer}
 */
export const POST_REDUCERS = (state: Selected < Post > = initialState, { type, payload }) => {
	switch (type) {

		/**
		 * Loads in all the new posts that are different from the previous stater
		 */
		case PostActions.LOAD_POSTS_COMPLETE:
			let newPosts = payload.filter((post: Post) => !state.ids[post.id]);
			let newEntities = newPosts.reduce((prev: any, post: Post) => Object.assign(prev, {
				[post.id]: post
			}), {});

			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, newEntities),
				ids: [...state.ids, ...newPosts.map((post: Post) => post.id)]
			});

		/**
		 * Creates a new post and sets its id to the maxId + 1
		 */
		case PostActions.CREATE_POST_COMPLETE:
			// get the max id cause our service can't 
			let max = parseInt(Object.keys(state.entities).reduce(
				(prev: string, curr: string) => parseInt(curr, 10) > parseInt(prev, 10) ? curr : prev), 10);

			// create a new comment with the id set to the max + 1
			let newPayload = Object.assign({}, payload, { id: max + 1 });
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[newPayload.id]: newPayload
				}),
				ids: [...state.ids, newPayload.id]
			});

		/**
		 * Updates a current post by changing its value in the entities field
		 */
		case PostActions.UPDATE_POST_COMPLETE:
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[payload.id]: payload
				}),
				ids: [...state.ids]
			});

		/**
		 * Changes the selected post based on the post that is sent
		 */
		case PostActions.SELECT_POST_COMPLETE:
			return Object.assign({}, state, { selected: payload.id });

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
 * This selector will grab the all the posts for a particular user and filter the list based on them
 * @returns {Observable<Post[]>}
 */
export const postsByUserId = (user_id: number) =>
	(state$: Observable<Selected<Post>>) => <Observable<Post[]>>
		state$
			.let(getEntities<Post>())
			.map((entities: Post[]) => entities
				.filter((comment: any) => {
					return comment.postId === user_id;
				}));
