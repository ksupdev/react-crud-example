export const getUsersState = store => store.users;

export const getUserList = store =>
  getUsersState(store) ? getUsersState(store) : [];

export const getUserById = (store, id) =>
  getUsersState(store) ? getUserList(store).find(user => user.id === id) : null;
