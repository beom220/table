import {atom, selector, selectorFamily} from "recoil";
import axios from "axios";

const userState = atom({
    key : 'userStateDefault',
    default : selector({
        key : 'userStateRefresh',
        get : async () => {
            try {
                const res = await axios.get('api/member');
                return res.data.user;
            } catch (e) { throw e}
        }
    })
})

// const userStateRefresh = selector({
//     key : 'userStateRefresh',
//     get : async () => {
//         try {
//             const res = await axios.get('api/member');
//             return res.data.user;
//         } catch (e) { throw e}
//     },
//     set : ({ set}, newValue) => {
//         set(userState, newValue)
//     }
// })

const userClear = selector({
    key : 'userClear',
    get : () => async ()  => {
        try {
            const res = await axios.get('api/member/logout');
            console.log('clear : ', res.data)
            return res.data.user;
        } catch (e) { throw e }
    },
    set : ({ set}, newValue) => {
        set(userState, newValue)
    }
})



export { userState, userClear }