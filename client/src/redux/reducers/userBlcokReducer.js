import { USER_TYPES_BLOCK } from '../actions/userBlockAction';

const initialState = {
  blockedUsers: [],
  loading: false,
  page: 1,
  result: 0,
};

const userBlockReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES_BLOCK.LOADING_USER:
      return {
        ...state,
        loading: action.payload,
      };

      case USER_TYPES_BLOCK.GET_USERS_BLOCK:
        return {
          ...state,
          blockedUsers:
            action.payload.page === 1
              ? action.payload.blockedUsers
              : [...state.blockedUsers, ...action.payload.blockedUsers],
          result: action.payload.result,
          page: action.payload.page,
        };
      
      

    default:
      return state;
  }
};

export default userBlockReducer;
