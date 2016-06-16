import { CREATE_POSTS, DELETE_POSTS, GET_POSTS, UPDATE_POSTS, SELECT_POSTS } from './post.actions';
import { Post } from './post.model';


export const POST_REDUCERS = (state: Array < Post > , { type, payload }) => {
	let index: number;
	switch (type) {
		case GET_POSTS:
			return payload;
		case CREATE_POSTS:
			return [...state, payload];
		case UPDATE_POSTS:
			return state.map(posts => {
				return posts.id == payload.id ? Object.assign({}, posts, payload) : posts;
			});

		case DELETE_POSTS:
			return state.filter(posts => {
				return posts.id != payload.id;
			});

		default:
			return state;
	}
}

export const SELECTED_POST = (state: {}, { type, payload }) => {
	switch (type) {
		case SELECT_POSTS:
			return payload;
		default:
			return state;
	}
}
