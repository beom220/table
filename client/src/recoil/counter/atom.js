import {atom} from "recoil";

const counter = atom({
    key: 'myCounter',
    default: 0
})

export { counter };