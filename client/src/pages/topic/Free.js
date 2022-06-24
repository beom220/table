import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import NotFound from "./NotFound";

export default function Free(){
    const [ data, setData ] = useState({});
    const [ dataCount, setDataCount] = useState('');

    const getFreeBoard = async () => {
        try {
            const res = await axios.get('api/topics/free');
            const {success, message} = res.data;

            if (!success) {
                console.log('에러뜸')
            }
            setData(message);
            setDataCount(message.length);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        getFreeBoard();
        console.log('dataCount : ',dataCount)
    },[dataCount])


    if(!!dataCount){
        return (
            <div className="board">
                <h1 className="title">Free Board</h1>
                <Link to="/free/create">Create</Link>
                {/* 최근글이 상위로*/}
                {data.slice(0).reverse().map((v, i) => (
                    <Topic data={v} key={i}/>
                ))}
            </div>
        )
    }
    return (
        <div className="board">
            <p>loading</p>
        </div>
    )

}

function Topic({ data }) {
    const link = `/free/${data.id}`;
    return (
        <article className="lists">
            <Link to={link}>
                <h2 className="list-title">{data.title}</h2>
            </Link>
            <div className="list-info">
                <p className="desc">{data.description}</p>
                <p className="author">{data.nickname}</p>
            </div>
        </article>
    );
}