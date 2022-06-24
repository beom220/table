import {counter} from "../../recoil/counter/atom";
import {countLabelState} from "../../recoil/counter/selector";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {useState} from "react";

export default function Test(){
    const [ count, setCount ] = useRecoilState(counter);
    const resetCount = useResetRecoilState(counter);
    const countLabel = useRecoilValue(countLabelState);
    const [ number, setNumber] = useState(1);
    const increment = () => setCount(count + number);
    const decrement = () => setCount(count - number);
    const onChange = (e) => setNumber(Number(e.target.value));
    const onReset = () => resetCount();
    return (
        <>
            <h2>input : {number}</h2>
            <br/><br/>
            <h2>count : {count}</h2>
            <br/><br/>
            <h2>countLabel : {countLabel}</h2>
            <br/><br/>
            <button onClick={onReset}>reset</button>
            <br/><br/>
            <input type="number" placeholder="number" value={number} onChange={onChange}/>
            <button onClick={increment}>count up</button>
            <button onClick={decrement}>count down</button>
        </>
    )
}