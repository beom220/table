import logo from '../assets/images/logo.webp'
import {Link} from "react-router-dom";
import { memberState} from "../recoil/member/authorize";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";
import {ModalConfirm, useModal} from "./modal";

function Header(){
    const setMember = useSetRecoilState(memberState);
    const member = useRecoilValue(memberState);
    const navigate = useNavigate();

    const  [toggleModal, triggerModal, modalMessage, setModalMessage] = useModal();
    useEffect(()=>{
        setModalMessage({title : '로그아웃 하시겠습니까?'})
    },[setModalMessage])

    const logOut = async () => {
        try {
            const res = await axios.get('api/member/logout');
            navigate('/');
            setMember(null);
        } catch (error) { throw error }
    };

    // 비회원
    if(!member){
        return (
            <header>
                <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
                <div className="utils">
                    <Link to='/login' className='button primary'>Login</Link>
                </div>
            </header>
        )
    }
    // 회원
    return (
        <header>
            <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
            <div className="utils">
                {/* 관리자 */}
                {member?.grade !== 5 ?
                    <Link to='/mypage' className='button primary'>My page</Link> :
                    <Link to='/mypage' className='button emphasis'>관리자</Link>
                }
                <button className="button secondary" type="button" onClick={triggerModal}>Logout</button>
            </div>
            {toggleModal && <ModalConfirm children={modalMessage} closed={triggerModal} action={logOut}/>}

        </header>
    )
}

export { Header }