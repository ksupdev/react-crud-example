import {CREATE_USER, UPDATE_USER, DELETE_USER} from '../actionTypes';

const initialState = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Anna'},
];

function generateId(users) {
  let userIds = users.map(user => user.id);
  if (userIds.length > 0) {
    return Math.max(...userIds) + 1;
  } else {
    return 1;
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER: {
      const {name} = action.payload;
      const id = generateId(state);
      return [
        ...state,
        {
          id: id,
          name: name
        }
      ];
    }
    case UPDATE_USER: {
      const {id, name} = action.payload;
      return [
        ...state.filter((user) => {
          return user.id !== id;
        }),
        {
          id: id,
          name: name
        }
      ];
    }
    case DELETE_USER: {
      const {id} = action.payload;
      return state.filter((user) => {
        return user.id !== id;
      });
    }
    default:
      return state;
  }
}
