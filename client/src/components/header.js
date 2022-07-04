import logo from '../assets/images/logo.webp'
import {Link} from "react-router-dom";
import { memberState} from "../recoil/member/authorize";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function Header(){
    const setMember = useSetRecoilState(memberState);
    const member = useRecoilValue(memberState);
    useEffect(() => {
        console.log('header : ',member);
    },[5])

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const res = await axios.get('api/member/logout');
            navigate('/');
            setMember(null);
        } catch (error) { throw error }
    };

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
    return (
        <header>
            <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
            <div className="utils">
                {member?.grade !== 5 ? <Link to='/mypage' className='button primary'>My page</Link> : <Link to='/mypage' className='button emphasis'>관리자</Link>}
                <button className="button secondary" type="button" onClick={logOut}>Logout</button>
            </div>
        </header>
    )
    // if(member?.id){
    //
    // }

}

export { Header }