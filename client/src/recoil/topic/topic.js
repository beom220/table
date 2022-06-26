import { selector } from "recoil";
import axios from "axios";

const getTopicsLists = selector({
    key: 'topics',
    get : async () => {
        try {
            const res = await axios.get('/api/topics/free/');
            const {message} = res.data
            // console.log(data);
            return message;
        } catch (e) {
            throw e;
        }
    }
})


export { getTopicsLists,  };