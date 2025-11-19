import { USER_TYPES } from '../actions/userAction';

const initialState = {
    loading: false,
    users: [],
    result: 0,
    page: 1,
    error: null,
    adminComments: {} // Estructura: { adminUserId: [comentarios] }
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
            case USER_TYPES.UPDATE_USER_VERIFICATION:
                return {
                  ...state,
                  users: state.users.map(u =>
                    u._id === action.payload._id ? { ...u, isVerified: action.payload.isVerified } : u
                  ),
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

        case USER_TYPES.BLOCK_USER_SUCCESS:
        case USER_TYPES.UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === action.payload.userId
                        ? { ...user, esBloqueado: action.payload.esBloqueado }
                        : user
                )
            };

        // CASOS PARA COMENTARIOS (CORREGIDOS)
        case USER_TYPES.GET_ADMIN_COMMENTS:
            return {
                ...state,
                adminComments: {
                    ...state.adminComments,
                    [action.payload.adminUserId]: action.payload.comments
                }
            };
          
        case USER_TYPES.ADD_ADMIN_COMMENT: {
            const { blogAuthor } = action.payload;
            return {
                ...state,
                adminComments: {
                    ...state.adminComments,
                    [blogAuthor]: [
                        action.payload,
                        ...(state.adminComments[blogAuthor] || [])
                    ]
                }
            };
        }

        default:
            return state;
    }
};

export default userReducer;