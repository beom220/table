import {atom, selector} from "recoil";




const authorState = atom({
    key: 'authorState',
    default: {
        id : '',
        email : '',
        grade : '',
        isLogger : false,
    },
})

const authorStateSelector = selector({
    key: 'authorStateSelector',
    get: ({get}) => {
        return get(authorState)
    }
})

const authorInputs = atom({
    key: 'authorInfo',
    default: {
        email: '',
        password: ''
    },
})



export {authorState, authorInputs}
export {authorStateSelector}