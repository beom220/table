import { Link, useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import NotFound from "./NotFound";

export default function FreeView(){
    const params = useParams();
    const param = params.name? params.name : false;

    const [ data, setData ] = useState({});
    const [ dataCount, setDataCount] = useState('');

    // TODO boardTable 생성
    const getFreeBoard = async () => {
        if(!param) {
            try {
                const res = await axios.get('/topics/free');
                const {success, message} = res.data;

                if (!success) {
                    console.log('에러뜸')
                }
                console.log(res.data)
                setData(message);
                setDataCount(message.length);
            } catch (err){
                console.error(err);
            }
            // return console.log('no id')
        }
        try {
            const res = await axios.get('/topics/free/' + param);
            const {success, message} = res.data;

            if (!success) {
                console.log('에러뜸')
            }
            console.log(res.data)
            setData(message);
            // return console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFreeBoard();
    },[])



    if(!param){
        console.log(data);
        
        return (
            <div className="board">
                <h1 className="title">Free Board</h1>
            </div>
        )
    }

    if(data){
        const link = `/free/update/${param}`;
        return (
            <>
                <Link to={link} >수정</Link>
                <h1>Hello</h1>
                <h2>match URL : {param}</h2>
                <div>
                    <h2>제목 : {data.title}</h2>
                    <p>글의아이디 : {data.id}</p>
                    <p>작성자 : {data.name}</p>
                    <p>글 : {data.description}</p>
                </div>
            </>
        );
    }

    return <NotFound/>;
}