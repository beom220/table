import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import NotFound from "./NotFound";

export default function Free(){
    const params = useParams();
    const param = params.name? params.name : false;

    const [ data, setData ] = useState({});
    const [ dataCount, setDataCount] = useState('');

    // TODO boardTable 생성
    const getFreeBoard = async () => {
        try {
            const res = await axios.get('/topics/free');
            const {success, message} = res.data;

            if (!success) {
                console.log('에러뜸')
            }
            setData(message);
            setDataCount(message.length);
            return console.log(res.data);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        getFreeBoard();
    },[])

    if(data.length){
        return (
            <div className="board">
                <h1 className="title">Free Board</h1>
                {data.map((v, i) => (
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