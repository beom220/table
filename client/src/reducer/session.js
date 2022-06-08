import axios from "axios";

const setToken = async () => {
    try {
        const res = await axios.get('/member')
        const {success, session} = res.data;
        if (!success) {
            console.log('no user');
            console.log('session', session);
            return null;
        }
        return sessionStorage.setItem('passport', session.passport);
    } catch (err) {
        console.error(err);
    }
}

const getToken = () => {
    if (!sessionStorage.length) {
        return null
    }
    sessionStorage.getItem('passport')
}

const restoreToken = () => ({
    type: 'RESTORE_TOKEN',
    userToken : getToken()
})

const signIn = () => ({
    type : 'SIGN_IN',
    userToken : getToken()
})

const initialState = {
    isLoading: true,
    isSignOut: false,
    userToken: null,
}

export default function authentication(state, action) {
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