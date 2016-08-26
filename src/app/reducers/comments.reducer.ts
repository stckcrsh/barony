import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import '@ngrx/core/add/operator/select';


import { Comment } from '../comments/shared/index';
import { CommentActions } from './comments.actions';
import { EntityStore } from './entityStore';


export interface CommentsState extends EntityStore < Comment > {
	entities: {
		[id: string]: Comment
	};
	ids: string[];
};

/**
 * Initial state for this sliver of the store
 */
const initialState: CommentsState = {
	entities: {},
	ids: []
};

/**
 * Unnecessary code used to supplement the shortcomings of the json service we use
 */
let ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let ID_LENGTH = 4;

let generate = function() {
	let rtn = '';
	for (let i = 0; i < ID_LENGTH; i++) {
		rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
	}
	return rtn;
};

/**
 * Comments Reducer.  This is used for updating the state of the comments when there is a comment related action 
 * @type {Reducer}
 */
export default function COMMENTS_REDUCER(state = initialState, { type, payload }) {
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
		case CommentActions.ADD_TO_COMMENTS_SUCCESS:
			let newPayload = Object.assign({}, payload, { id: generate() });
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
 * This will return all the entities from a state CommentsState
 * @returns {Observable<{[id:string]:Comment}>}
 */
export const getCommentEntities = () =>
	(state$: Observable < CommentsState > ) =>
	state$
	.select((state: CommentsState) => state.entities);

/**
 * This will return a single entity from a state CommentsState
 * @returns {Observable<Comment>}
 */
export const getComment = (commentId: string) =>
	(state$: Observable < CommentsState > ) =>
	state$
	.select((state: CommentsState) => state.entities[commentId]);

/**
 * This returns the entitys for the selected ids
 * @returns {Observable<Comment[]>}
 */
export const getComments = (commentIds: string[]) =>
	(state$: Observable < CommentsState > ) =>
	state$
	.let(getCommentEntities())
	.map(entities =>
		commentIds.map((id: string) =>
			entities[id]));

/**
 * This selector will grab the all the comments for a particular postId and filter the list based on them
 * @returns {Observable<Comment[]>}
 */
export const getCommentsByPostId = (postId: string) =>
	(state$: Observable < CommentsState > ) =>
	< Observable < Comment[] >> state$
	.map(state =>
		state.ids
		.filter(id =>
			state.entities[id].postId === postId)
		.map(id =>
			state.entities[id]));
