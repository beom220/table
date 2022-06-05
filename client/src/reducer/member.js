const initialState = {
    user : {},
    // login
    loginFailure : false,
    loginLoading : false,
    loginSuccess : false,
    // logout
    logoutFailure : false,
    logoutLoading : false,
    logoutSuccess : false,
}

// action type
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILURE = 'LOGIN_FAILURE';

export const loginReqAction = () => ({ type : LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type : LOGIN_SUCCESS, user })
export const loginFailure = () => ({ type : LOGIN_FAILURE });

export const logoutReqAction = () => ({ type : LOGOUT_REQUEST });

export default function member(state = initialState, action){
    switch (action.type) {
        // login
        case LOGIN_REQUEST :
            return {
                ...state,
                loginLoading : true,
            }

        case LOGIN_SUCCESS :
            return {
                ...state,
                user: action.user,
                loginSuccess: true,
                loginLoading: false,
            }

        case LOGIN_FAILURE :
            return {
                ...state,
                loginLoading: false,
                loginFailure: action.error
            }

        // logut
        case LOGOUT_REQUEST :
            return {
                ...state,
                logoutLoading : true,
            }

        case LOGOUT_SUCCESS :
            return {
                ...state,
                loginSuccess: true,
                user : state.user
            }

        case LOGOUT_FAILURE :
            return {
                ...state,
                logoutFailure: action.error
            }

        default :
            return state;
    }
}