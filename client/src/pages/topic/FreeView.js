import {Link, useNavigate, useParams} from 'react-router-dom';
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {getComment, getTopic, getTopicsLists} from "../../recoil/topic/topic";
import ShowMarkDown from "../../components/markdown";
import {useFullDate, useTimeForToday} from "../../components/utils/today";
import {useEffect, useState} from "react";
import {ModalConfirm} from "../utils/utils";
import axios from "axios";
import {memberState} from "../../recoil/member/authorize";
import Pager from "../../components/utils/pager";


export default function FreeView() {
    const params = useParams();
    const param = Number(params.name);
    const list = useRecoilValue(getTopic(param));
    const topicLists = useRecoilValue(getTopicsLists);

    const fullDate = useFullDate(list.createdAt);
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const modalClose = () => {
        setModal(false)
    }
    const modalMessage = {
        title: '팝업제목',
        desc: '어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n'
    };
    // const modalMessage = '어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n어휴 그렇게하면 어떻게하니?\n';
    const action = () => {
        alert('응 너 멍충이~~')
    }

    const scrollTop = () => {
        document.documentElement.scrollTop = 0;
    }
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modal]);

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
                    <Comment param={param}/>
                    <ViewComment param={param}/>
                </>
            }
        </div>
    )
}

function Comment({param}) {
    const commentsUpdate = useRecoilRefresher_UNSTABLE(getComment(param));
    const member = useRecoilValue(memberState);

    const [inputs, setInputs] = useState({
        description: '',
        memberId: member?.id || '',
        topicId: param,
    });

    useEffect(() => {
        setInputs({...inputs, description: ''});
    }, [param])

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!member) {
            alert('로그인하세용ㅎ');
            return false;
        }
        try {
            const res = await axios.post('/api/comment/create', inputs);
            const {success, message} = res.data;

            if (!success) {
                console.log(success);
                return alert(message);
            }
            commentsUpdate();
            return alert(message);
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className="comment">
            <form action="" onSubmit={onSubmit}>
                <h4>댓글달기</h4>
                <textarea name="description" placeholder="댓글을 입력해주세요" onChange={onChange} value={inputs.description}/>
                <div className="buttons right">
                    <button className="button primary" type="submit">댓글달기</button>
                </div>
            </form>
        </div>
    )
}

function ViewComment({param}) {
    const member = useRecoilValue(memberState);
    const comments = useRecoilValue(getComment(param));
    const [update, setUpdate] = useState(false);
    if (!comments) return null;

    const TimeForToday = val => useTimeForToday(val);
    const onClick = async (val) => {
        console.log(val);
        // try {
        //     const res = await axios.post('/api/comment/delete', {id : val});
        //     const {success, message} = res.data;
        //
        //     if (!success) {
        //         console.log(success);
        //         return alert(message);
        //     }
        //     commentsUpdate();
        //     return alert(message);
        // } catch (err) {
        //     console.error(err.message);
        // }
    }

    return (
        comments.map((comment, index) => {
            const {nickname, description, createdAt, id, memberId} = comment;
            // console.log('memberid : ', member.id)
            // console.log('cmemberid : ', memberId)
            // console.log(id);

            return (
                <div className="comment_view" key={index}>
                    <div className="view_header">
                        <div>
                            <span className="author">{nickname} · </span>
                            <span className="created">{TimeForToday(createdAt)}</span>
                        </div>
                        {!member ? null : member.id !== memberId ? null :
                            <div className="buttons">
                                <button className="button secondary update" onClick={() => setUpdate(true)}>수정</button>
                                <button className="button secondary delete" onClick={() => onClick(id)}>삭제</button>
                            </div>
                        }
                    </div>
                    {!update ? <p>{description}</p> : null}

                </div>
            )
        })
    )
}
