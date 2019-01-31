import {CREATE_USER, UPDATE_USER, DELETE_USER} from './actionTypes';

export const createUser = content => ({
  type: CREATE_USER,
  payload: {
    ...content
  }
});

export const updateUser = content => ({
  type: UPDATE_USER,
  payload: {
    ...content
  }
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: {id}
});

