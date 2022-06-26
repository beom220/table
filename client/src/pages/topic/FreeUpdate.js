import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {getTopic, updateTopic} from "../../recoil/topic/topic";
import {memberState} from "../../recoil/member/authorize";

export default function FreeUpdate(){
    const params = useParams();
    const param = params.name;
    const member = useRecoilValue(memberState);
    const list = useRecoilValue(getTopic(param));
    const navigate = useNavigate();

    useEffect(() => {
        if(!!param !== !!member.id){
            navigate(-1);
            console.log(typeof param);
            console.log(typeof member.id);
        }
    },[member])


    const today = () => {
        const year = new Date().getFullYear();
        const month = ("0" + (1 + new Date().getMonth())).slice(-2);
        const date = ("0" + new Date().getDate()).slice(-2);
        return year + month + date;
    };

    const [inputs, setInputs] = useState({
        memberId : member.id,
        title: list.title,
        key:list.id,
        description: list.description,
        useComment : list.useComment,
        disabled : list.disabled,
        updateAt : today()
    });
    const { memberId, title, key, description, useComment, disabled, updateAt } = inputs;


    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onCheck = (e) => {
        const {checked, name} = e.target;
        setInputs({
            ...inputs,
            [name] : String(Number(!!checked))
        })
    }

    return (
        <>
            <h1>업데이트</h1>
            <h2>match URL : {param}</h2>
            <form action="" >
                <input type="text" name="memberId" value={memberId} readOnly disabled/>
                <input type="text" name="listId" value={key} readOnly/>
                <input type="text" name="title" placeholder="글 제목을 입력해주세요"
                       defaultValue={title} onChange={onChange}

                />
                <textarea name="description"
                          placeholder="글 내용을 입력해주세요"
                          defaultValue={description}
                          onChange={onChange}
                />
                <label htmlFor="comment" className="check-box">
                    <input type="checkbox" id="comment" name="useComment" onChange={onCheck}
                           checked={!!Number(useComment)}
                    />
                    <span>댓글 사용함</span>
                </label>
                <label htmlFor="disabled" className="check-box">
                    <input type="checkbox" id="disabled" name="disabled" onChange={onCheck}
                           checked={!!Number(disabled)}
                    />
                    <span>작성글 공개안함</span>
                </label>
                <input type="text" name="updateAt" value={updateAt} readOnly disabled/>
                <button type="submit" className='primary'>업데이트</button>
                <button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>
            </form>
        </>
    );

    // if(!param){
    //     console.log(data);
    //
    //     return (
    //         <div className="board">
    //             <h1 className="title">Free Board</h1>
    //         </div>
    //     )
    // }
    //
    // if(data){
    //     return (
    //         <>
    //             <h1>업데이트</h1>
    //             <h2>match URL : {param}</h2>
    //             <form action="" >
    //                 <input type="text" name="memberId" value={memberId} readOnly disabled/>
    //                 <input type="text" name="listId" value={key}/>
    //                 <input type="text" name="title" placeholder="글 제목을 입력해주세요"
    //                        defaultValue={title} onChange={onChange}
    //
    //                 />
    //                 <textarea name="description" placeholder="글 내용을 입력해주세요"
    //                           defaultValue={description}
    //                           onChange={onChange}
    //                 />
    //                 <label htmlFor="comment" className="check-box">
    //                     <input type="checkbox" id="comment" name="useComment" onChange={onCheck}
    //                            checked={!!Number(useComment)}
    //                     />
    //                     <span>댓글 사용함</span>
    //                 </label>
    //                 <label htmlFor="disabled" className="check-box">
    //                     <input type="checkbox" id="disabled" name="disabled" onChange={onCheck}/>
    //                     <span>작성글 공개안함</span>
    //                 </label>
    //                 <button type="submit" className='primary'>업데이트</button>
    //                 <button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>
    //             </form>
    //         </>
    //     );
    // }
}