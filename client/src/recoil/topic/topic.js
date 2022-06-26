import { selector, selectorFamily } from "recoil";
import axios from "axios";
import {memberState} from "../member/authorize";

const getTopicsLists = selector({
    key: 'getTopicsLists',
    get : async () => {
        try {
            const res = await axios.get('/api/topics/free/');
            const {message} = res.data
            // console.log(data);
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

const createTopic = selectorFamily({
    key: 'createTopic',
    get : (inputs) => async () => {
        try {
            const res = await axios.post('/api/topics/free/create', inputs);
            const { message } = res.data;
            return message;
        } catch (err) {
            throw err;
        }
    }
})

export { getTopicsLists, getTopic };