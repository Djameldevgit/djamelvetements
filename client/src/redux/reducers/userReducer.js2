import { USER_TYPES } from '../actions/userAction';
 
const initialState = {
    
    loading: false,
    users: [],
  
    result: 0,
    page: 1,
    error: null,




};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_TYPES.LOADING_USERS:
            return { ...state, loading: action.payload };
 
            case USER_TYPES.GET_USERS:
                return {
                    ...state,
                    users: action.payload.users,
                    result: action.payload.result,
                    page: action.payload.page,
                };

        case USER_TYPES.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => 
                    user._id === action.payload._id ? action.payload : user
                ),
            };
            case USER_TYPES.TOGGLE_ACTIVE_STATUS:
                return {
                  ...state,
                  users: state.users.map(user =>
                    user._id === action.payload.id
                      ? { ...user, isActive: !user.isActive }
                      : user
                  )
                };
            case USER_TYPES.DELETE_USER:
                return {
                  ...state,
                  users: state.users.filter(u => u._id !== action.payload._id),
                  result: state.result - 1
                };
      
                case USER_TYPES.UPDATE_USER_BLOCK_STATUS:
                    return {
                      ...state,
                      users: state.users.map(user =>
                        user._id === action.payload.userId
                          ? { ...user, esBloqueado: action.payload.esBloqueado }
                          : user
                      ),
                    };
                  
                  
                
        default:
            return state;
    }
};

export default userReducer;
