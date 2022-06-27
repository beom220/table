import {Link, useParams} from 'react-router-dom';
import {useRecoilValue} from "recoil";
import {getTopicsLists} from "../../recoil/topic/topic";
import {memberState} from "../../recoil/member/authorize";
import ShowMarkDown from "../../components/markdown";

export default function Free() {
    const user = useRecoilValue(memberState);
    const topicLists = useRecoilValue(getTopicsLists);

    return (
        <div className="board">
            <div className="side-by-side">
                <h1 className="title">Free Board</h1>
                {!user ? null : <Link to='/free/create' className="button secondary">글쓰기</Link>}
            </div>
            {topicLists.slice(0).reverse().map((list, index) => {
                return <Topic list={list} key={index}/>
            })}
        </div>
    )
}

function Topic({list}) {
    const link = `/free/${list.id}`;
    return (
        <article>
            <p className="author">{list.nickname}</p>
            <div className="lists">
                <Link to={link}>
                    <div className="list-info">
                        <h2 className="list-title">{list.title}</h2>
                        <div className="desc">
                            <ShowMarkDown children={list.description}/>
                        </div>
                    </div>
                </Link>
            </div>
        </article>
    );
}