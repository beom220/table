import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useRecoilValue, useRecoilRefresher_UNSTABLE} from "recoil";
import {memberState} from "../../recoil/member/authorize";
import {getTopicsLists} from "../../recoil/topic/topic";
import ShowMarkDown from "../../components/markdown";
import {ModalConfirm, useModal} from "../../components/modal";


export default function FreeCreate(){
    const navigate = useNavigate();
    const member = useRecoilValue(memberState);
    const listUpdate = useRecoilRefresher_UNSTABLE(getTopicsLists);
    const [freeView, setFreeView] = useState(false);

    const [inputs, setInputs] = useState({
        title:'',
        description:'',
        memberId : member.id,
        useComment : '1',
        disabled : '0',
    });
    const { title, description, memberId, useComment, disabled } = inputs;

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


    const onSubmit = async (e) => {
        // e.preventDefault();
        try {
            const res = await axios.post('/api/topics/free/create', inputs);
            const {success, message, topicId} = res.data;

            if(!success){
                console.log(success);
                return alert(message);
            }
            console.log(res.data);
            listUpdate();
            return navigate('/free/' + topicId);
        } catch (err) {
            console.error(err.message);
        }
    }

    const  [toggleModal, triggerModal, modalMessage, setModalMessage] = useModal();

    useEffect(()=>{
        setModalMessage({title : '글을 작성하시겠습니까?'})
    },[setModalMessage])


    if(!freeView){
        return (
            <>
                <form>
                    <input type="text" name="title" placeholder="글 제목을 입력해주세요" value={title} onChange={onChange}/>
                    <textarea name="description" onChange={onChange} value={description} placeholder="글 내용을 입력해주세요"/>
                    <div className="side-by-side">
                        <div className="labels">
                            <label htmlFor="comment" className="check-box">
                                <input type="checkbox"
                                       id="comment" name="useComment"
                                       onChange={onCheck}
                                       checked={!!Number(useComment)}
                                />
                                <span>댓글 사용함</span>
                            </label>
                            <label htmlFor="disabled" className="check-box">
                                <input type="checkbox"
                                       id="disabled" name="disabled"
                                       onChange={onCheck}
                                       checked={!!Number(disabled)}
                                />
                                <span>작성글 공개안함</span>
                            </label>
                        </div>
                        <div className="buttons">
                            <button type="button" className="emphasis"
                                    onClick={() => setFreeView(true)}
                            >미리보기
                            </button>
                        </div>
                    </div>
                    <button type="button" className='primary' onClick={triggerModal}>작성 완료</button>
                    <button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>
                    {toggleModal && <ModalConfirm children={modalMessage} closed={triggerModal} action={onSubmit}/>}
                </form>
            </>
        )
    }
    return (
        <div className="board">
            <div className="view">
                <div className="info">
                    <h2>{title}</h2>
                </div>
                <ShowMarkDown children={description}/>
            </div>
            <div className="buttons right">
                <button type="button" className="button secondary"
                        onClick={() => setFreeView(false)}
                >되돌아가기
                </button>
            </div>
        </div>
    )
}