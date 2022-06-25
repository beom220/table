import {Suspense} from "react";
import { selector, useRecoilValue } from "recoil";
import axios from "axios";

const getTopics = selector({
    key: 'topics',
    get : async () => {
        const res = await axios.get('/api/topics/free/');
        const { data } = res;
        console.log(data);
        return data;
    }
})

function ResultArray({list}){
    const {title, description} = list;
    return (
        <article>
            <h2>title : {title}</h2>
            <p>description : {description}</p>
            <br/>
            <br/><br/><br/><br/><br/>
        </article>
    )
}

function QueryResult(){
    const queryResult = useRecoilValue(getTopics);
    return (
        <section>
            {queryResult.message.map((v,i) => {
                return <ResultArray list={v} key={i}/>
            })}
        </section>

    );
}

function ResultSection(){
    return <QueryResult/>
}

export { ResultSection };