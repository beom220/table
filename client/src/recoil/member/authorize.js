import {atom, selector } from "recoil";
import axios from "axios";

// Prefetching
const memberState = atom({
    key : 'memberState',
    default : selector({
        key : 'memberStateRefresh',
        get : async () => {
            try {
                const res = await axios.get('api/member');
                return res.data.user;
            } catch (error) { throw error }
        }
    }),
})
// const memberState = selector({
//     key : 'memberStateRefresh',
//     get : async ({ get }) => {
//         const oldMember = get(memberDefault);
//         try {
//             const res = await axios.get('api/member');
//             return !oldMember ? res.data.user : null;
//         } catch (error) {
//             throw error
//         }
//     }
// })

export { memberState }