import {Link, useParams} from 'react-router-dom';
import {useRecoilValue} from "recoil";
import {getTopicsLists} from "../../recoil/topic/topic";
import {memberState} from "../../recoil/member/authorize";
import ShowMarkDown from "../../components/markdown";

export default function Free(){
    const user = useRecoilValue(memberState);
    const topicLists = useRecoilValue(getTopicsLists);

    return (
        <div className="board">
            <h1 className="title">Free Board</h1>
            {!user? null : <Link to='/free/create'>글쓰기</Link>}
            {topicLists.map((list, index) => {
                return <Topic list={list} key={index}/>
            })}
        </div>
    )
}

function Topic({ list }) {
    const link = `/free/${list.id}`;
    return (
        <article className="lists">
            <Link to={link}>
                <h2 className="list-title">{list.title}</h2>
            </Link>
            <div className="list-info">
                <Link to={link} className="desc">
                    <ShowMarkDown children={list.description}/>
                </Link>
                <p className="author">{list.nickname}</p>
            </div>
        </article>
    );
}