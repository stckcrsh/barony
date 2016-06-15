import { User } from './user.model';
import { CREATE_USER, UPDATE_USER, ADD_USER, SELECT_USER } from './user.action';

var initialState = < User > {};

export const USER_REDUCER = (state: Array < User > , { type, payload }) => {
  switch (type) {
    case 'ADD_USER':
      return payload;
    case 'CREATE_USER':
      return [...state, payload];
    case 'UPDATE_USER':
      return state.map(user => {
        return user.id === payload.id ? Object.assign({}, user, payload) : user
      });
    default:
      return state;
  }
};

export const SELECTED_USER = (state: User = initialState, { type, payload }) => {
  switch (type) {
    case 'SELECT_USER':
      return payload;
    default:
      return state;
  }
};
