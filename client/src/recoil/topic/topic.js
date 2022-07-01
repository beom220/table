import { selector, selectorFamily } from "recoil";
import { v1 } from "uuid";
import axios from "axios";

const getTopicsLists = selector({
    key: `getTopicsLists/${v1()}`,
    get : async () => {
        try {
            const res = await axios.get('/api/topics/free/');
            const {message} = res.data
            return message;
        } catch (err) {
            throw err;
        }
    }
})

const getTopic = selectorFamily({
    key: 'getTopic',
    get : (param) => async () => {
        try {
            const res = await axios.get('/api/topics/free/' + param);
            const { message } = res.data;
            return message;
        } catch (err) {
            throw err;
        }
    }
})

const getComment = selectorFamily({
    key: 'getComment',
    get : (param) => async () => {
        try {
            const res = await axios.get('/api/comment/' + param);
            const { message } = res.data;
            return message;
        } catch (err) {
            throw err;
        }
    }
})


export { getTopicsLists, getTopic, getComment };