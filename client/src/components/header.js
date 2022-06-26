import logo from '../assets/images/logo.webp'
import {Link} from "react-router-dom";
import { memberState} from "../recoil/member/authorize";
import { useRecoilValue, useRecoilState} from "recoil";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

function Header(){
    // const [user, setUser] = useRecoilState(userStateRefresh);
    const [member, setMember] = useRecoilState(memberState);

    const navigate = useNavigate();
    const logOut = async () => {
        try {
            const res = await axios.get('api/member/logout');
            setMember(res.data.user);
            navigate('/');
        } catch (error) { throw error }
    };
    useEffect(()=>{
        console.log('default', member)

    },)

    if(member?.id){
        return (
            <header>
                <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
                <div className="utils">
                    <Link to='/mypage' className='primary'>My page</Link>
                    <button type="button" onClick={logOut}>Logout</button>
                    {/*<Link to='/logout' className='secondary'>LogOut</Link>*/}
                </div>
            </header>
        )
    }
    return (
        <header>
            <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
            <div className="utils">
                <Link to='/login' className='primary'>Login</Link>
            </div>
        </header>
    )
}

export { Header }