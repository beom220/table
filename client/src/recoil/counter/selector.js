import {selector} from "recoil";
import {counter} from "./atom";

const countLabelState = selector({
    key : 'countLabelState',
    get : ({get}) => {
         return get(counter);
    }
})

export { countLabelState };