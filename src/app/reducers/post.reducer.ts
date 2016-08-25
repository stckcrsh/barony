import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';

import { PostActions } from './post.actions';
import { Post } from '../posts/shared/index';
import { Selected, getSelected } from './entityStore';

export interface PostsState extends Selected < Post > {
	entities: {
		[id: string]: Post
	};
	ids: string[];
	selected: string;
}

/**
 * Initial state for this sliver of the store
 */
const initialState: PostsState = {
	entities: {},
	ids: [],
	selected: null
};

/**
 * Posts Reducer.  This is used for updating the state of the posts when there is a post related action 
 * @type {Reducer}
 */
export default function POST_REDUCERS(state: Selected < Post > = initialState, { type, payload }) {
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
 * This will return all the entities from a state PostsState
 * @returns {Observable<{[id:string]:Post}>}
 */
export const getPostEntities = () =>
	(state$: Observable < PostsState > ) =>
	state$.select(state =>
		state.entities);

/**
 * This will return a single entity from a state PostsState
 * @returns {Observable<Post>}
 */
export const getPost = (postId: string) =>
	(state$: Observable < PostsState > ) =>
	state$.select(state =>
		state.entities[postId]);

/**
 * This returns the Posts with the given ids
 * @returns {Observable<Post[]>}
 */
export const getPosts = (postIds: string[]) =>
	(state$: Observable < PostsState > ) =>
	state$
	.let(getPostEntities())
	.map(entities =>
		postIds.map((id: string) =>
			entities[id]));

/**
 * This will return all the posts in a list
 * @type {Observable<Post[]>}
 */
export const getAllPosts = () =>
	(state$: Observable < PostsState > ) =>
	state$
	.map(state =>
		state.ids.map(id =>
			state.entities[id]));

/**
 * This returns the entity for the selected post Selected<Post>
 * @returns {Observable<Post>}
 */
export const getSelectedPost = () =>
	(state$: Observable < PostsState > ) =>
	< Observable < Post >> state$.let(getSelected < Post > ());


/**
 * This selector will grab the all the posts for a particular user and filter the list based on them
 * @returns {Observable<Post[]>}
 */
export const getPostsByUserId = (userId: string) =>
	(state$: Observable < PostsState > ) =>
	state$.map(state =>
		state.ids
		.filter(id =>
			state.entities[id].userId === userId)
		.map(id =>
			state.entities[id]));
