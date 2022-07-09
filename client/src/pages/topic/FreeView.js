import {Link, useParams} from 'react-router-dom';
import {useRecoilValue} from "recoil";
import {getTopic, getTopicsLists} from "../../recoil/topic/topic";
import ShowMarkDown from "../../components/markdown";
import {useFullDate} from "../../components/utils/today";
import {useEffect} from "react";
import Pager from "../../components/utils/pager";
import {ViewComments, WriteComment} from "./comments";

function scrollTop(){document.documentElement.scrollTop = 0}

export default function FreeView() {
    const params = useParams();
    const param = Number(params.name);
    const list = useRecoilValue(getTopic(param));
    const topicLists = useRecoilValue(getTopicsLists);
    const fullDate = useFullDate(list.createdAt);

    useEffect(() => {
        scrollTop();
    }, [list])

    return (
        <div className="board">
            <div className="view">
                <div className="info">
                    <h2>{list.title}</h2>
                    <span>{list.nickname} · </span>
                    <span>{fullDate}</span>
                </div>
                <ShowMarkDown children={list.description}/>
            </div>

            <Pager current={list} arr={topicLists}/>

            <div className="buttons right">
                <Link to="/free" className="button secondary">목록으로</Link>
            </div>

            {!list.useComment ? null :
                <>
                    <WriteComment listNum={list.id}/>
                    <ViewComments listNum={list.id}/>
                </>
            }
        </div>
    )
}
