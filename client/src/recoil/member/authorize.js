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
    })
})

export { memberState }