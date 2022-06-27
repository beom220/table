import {Link, useNavigate, useParams} from 'react-router-dom';
import { useRecoilValue} from "recoil";
import {getTopic, getTopicsLists} from "../../recoil/topic/topic";
import ShowMarkDown from "../../components/markdown";
import {memberState} from "../../recoil/member/authorize";


export default function FreeView(){
    const params = useParams();
    const param = params.name - 1;
    const member = useRecoilValue(memberState);
    const link = `/free/update/${param}`;
    const lists = useRecoilValue(getTopicsLists);
    const list = lists[param];
    return (
        <>
            {/*{member?.id !== lists[param].memberId ? null : <Link to={link}>수정</Link>}*/}
            <h1>Hello</h1>
            <h2>match URL : {param + 1}</h2>
            <div>
                <h2>제목 : {list.title}</h2>
                <p>글의아이디 : {list.id}</p>
                <p>작성자 : {list.nickname}</p>
                <p>작성자 id : {list.memberId}</p>
                <ShowMarkDown children={list.description}/>
            </div>
        </>
    )
}