import axios from "axios";

export const setToken = async () => {
    try {
        const res = await axios.get('/api/member')
        const {success, session} = res.data;
        if (!success) {
            // console.log('no user');
            // console.log('session', session);
            return false;
        }
        sessionStorage.setItem('passport', JSON.stringify(session.passport.user));
    } catch (err) {
        console.error(err);
    }
}

export const getToken = () => {
    // if (!sessionStorage.length) {
    //     return null
    // }
    return sessionStorage.getItem('passport');
}

export const clearToken = () => {
    if (!sessionStorage.length) {
        return null;
    }
    sessionStorage.removeItem('passport');
    return null;
}


export const restoreToken = () => ({
    type: 'RESTORE_TOKEN',
    userToken : getToken()
})

export const signIn = () => ({
    type : 'SIGN_IN',
    userToken : getToken()
})

export const signOut = () => ({
    type : 'SIGN_OUT',
    userToken : clearToken()
})

const initialState = {
    isLoading: true,
    isSignOut: true,
    userToken: null,
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case 'RESTORE_TOKEN' :
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            }

        case 'SIGN_IN' :
            return {
                ...state,
                isSignOut: false,
                userToken: action.token,
            }

        case 'SIGN_OUT' :
            return {
                ...state,
                isSignOut: true,
                userToken: null
            }
        default :
            return state;
    }
}