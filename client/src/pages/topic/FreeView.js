import {Link, useNavigate, useParams} from 'react-router-dom';
import { useRecoilValue} from "recoil";
import {getTopic, getTopicsLists} from "../../recoil/topic/topic";
import ShowMarkDown from "../../components/markdown";
import {memberState} from "../../recoil/member/authorize";
import { useTimeForToday } from "../../components/utils/today";



export default function FreeView(){
    const params = useParams();
    const param = Number(params.name);
    const list = useRecoilValue(getTopic(param));
    const topicLists = useRecoilValue(getTopicsLists);

    return (
        <div className="board">
            <div className="view">
                {/*{member?.id !== lists[param].memberId ? null : <Link to={link}>수정</Link>}*/}
                {/*<h2>match URL : {param}</h2>*/}
                <div className="info">
                    <h2>{list.title}</h2>
                    <span>{list.nickname} · </span>
                    <span>{useTimeForToday(list.createdAt)}</span>
                </div>
                {/*<p>작성자 id : {list.memberId}</p>*/}
                <ShowMarkDown children={list.description}/>
            </div>

            <div className="pager">
                <Prev param={param} array={topicLists}/>
                <Next param={param} array={topicLists}/>
            </div>
            <div className="buttons right">
                <Link to="/free" className="button secondary">목록으로</Link>
            </div>

            <div className="comment">
                <form action="">
                    <h4>댓글달기</h4>
                    <textarea name="description" placeholder="댓글을 입력해주세요"/>
                    <div className="buttons right">
                        <button className="button primary">댓글달기</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



const Next = ({param, array}) => {
    const lastIndex = array.length;
    if(param === lastIndex){
        return null;
    }
    const link = `/free/${array[param].id}`
    return (
        <Link to={link} className="next">
            <span>다음글</span>
            <p>{array[param].title}</p>
        </Link>
    )
}
const Prev = ({param, array}) => {
    const firstIndex = 1;
    if(param === firstIndex){
        return null;
    }
    const link = `/free/${array[param-2].id}`
    return (
        <Link to={link} className="prev">
            <span>이전글</span>
            <p>{array[param-2].title}</p>
        </Link>
    )
}