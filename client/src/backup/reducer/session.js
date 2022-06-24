import axios from "axios";

export const setToken = async () => {
    try {
        const res = await axios.get('/api/member')
        const {success, user} = res.data;
        if (!success) {
            console.log('no user');
            console.log('user', user);
            return false;
        }
        sessionStorage.setItem('user', JSON.stringify(user).replace(/\"/gi, ""));
        // sessionStorage.setItem('user', user);
    } catch (err) {
        console.error(err);
    }
}

export const getToken = () => {
    // if (!sessionStorage.length) {
    //     return null
    // }
    return sessionStorage.getItem('user');
}

export const clearToken = () => {
    if (!sessionStorage.length) {
        return null;
    }
    sessionStorage.removeItem('user');
    return null;
}


// action func
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


//
const initialState = {
    isLoading: false,
    isSignOut: true,
    userToken: getToken(),
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case 'RESTORE_TOKEN' :
            return {
                ...state,
                userToken: action.token,
                isLoading: true,
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