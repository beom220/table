import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {getComment} from "../../recoil/topic/topic";
import {memberState} from "../../recoil/member/authorize";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {useTimeForToday} from "../../components/utils/today";

function WriteComment({listNum}) {
    const member = useRecoilValue(memberState);
    const commentsUpdate = useRecoilRefresher_UNSTABLE(getComment(listNum));
    const [inputs, setInputs] = useState({
        description: '',
        memberId: member?.id || '',
        topicId: listNum,
    });

    useEffect(() => {
        setInputs({...inputs, description: '', topicId: listNum});
    }, [listNum])


    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const blank_pattern = /^\s+$/g;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!member) {
            alert('로그인하세용ㅎ');
            return;
        }
        if(blank_pattern.test(inputs.description) || inputs.description === '') {
            alert('댓글을 입력해주세요');
            return;
        }
        try {
            const res = await axios.post('/api/comment/create', inputs);
            const {success, message} = res.data;

            if (!success) {
                console.log(success);
                return alert(message);
            }
            commentsUpdate();
            setInputs({...inputs, description: ''});
            alert(message);
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

function ViewComments({listNum}) {
    const comments = useRecoilValue(getComment(listNum));
    if (!comments) return null;

    return (
        comments.map((comment, index) => {
            return <ViewComment comment={comment} key={index}/>
        })
    )
}

function ViewComment({comment}){
    const member = useRecoilValue(memberState);
    const TimeForToday = val => useTimeForToday(val);
    const {nickname, description, createdAt, updateAt, id, memberId, topicId} = comment;
    const [update, setUpdate] = useState(false);
    const commentsUpdate = useRecoilRefresher_UNSTABLE(getComment(topicId));
    const allow = !member ? false : member.id !== memberId ? false : true;

    const [inputs, setInputs ] = useState({
        id : id,
        description: description,
        memberId : member?.id || '',
        topicId : topicId
    })
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
            const res = await axios.post(`/api/comment/update/${id}`, inputs);
            const {success, message} = res.data;

            if (!success) {
                console.log(success);
                return alert(message);
            }
            setUpdate(false);
            commentsUpdate();
            return alert(message);
        } catch (err) {
            console.error(err.message);
        }
    }

    if(!update){
        return (
            <div className="comment_view">
                <div className="view_header">
                    <div>
                        <span className="author">{nickname}</span>
                        {!updateAt?
                            <span className="created"> · {TimeForToday(createdAt)}</span> :
                            <span className="created">수정됨 · {TimeForToday(updateAt)}</span>
                        }
                    </div>
                    {!allow? null :
                        <div className="buttons">
                            <button className="button secondary update" onClick={() => setUpdate(true)}>수정</button>
                            <button className="button danger delete">삭제</button>
                        </div>
                    }
                </div>
                <p>{description}</p>
            </div>
        )
    }
    return (
        <div className="comment_view">
            <div className="view_header">
                <div>
                    <span className="author">{nickname}</span>
                    {!updateAt?
                        <span className="created"> · {TimeForToday(createdAt)}</span> :
                        <span className="created">수정됨 · {TimeForToday(updateAt)}</span>
                    }
                </div>
            </div>
            <div className="comment">
                <form action="" onSubmit={onSubmit}>
                    <textarea name="description" placeholder="댓글을 입력해주세요" defaultValue={description} onChange={onChange}/>
                    <div className="buttons right">
                        <button className="button secondary delete" onClick={() => setUpdate(false)}>취소</button>
                        <button className="button primary update" type="submit">수정</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export {WriteComment, ViewComments}