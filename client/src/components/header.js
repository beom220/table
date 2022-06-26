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
        console.log(member);
    }, [member])

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const res = await axios.get('api/member/logout');
            setMember(null);
            navigate('/');
        } catch (error) { throw error }
    };

    if(!member){
        return (
            <header>
                <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
                <div className="utils">
                    <Link to='/login' className='primary'>Login</Link>
                </div>
            </header>
        )
    }
    return (
        <header>
            <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
            <div className="utils">
                <Link to='/mypage' className='primary'>My page</Link>
                <button className="secondary" type="button" onClick={logOut}>Logout</button>
            </div>
        </header>
    )
    // if(member?.id){
    //
    // }

}

export { Header }