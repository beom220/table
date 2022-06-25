import logo from '../assets/images/logo.webp'
import {Link} from "react-router-dom";
import {userClear, userState} from "../recoil/member/authorize";
import {useRecoilState, useRecoilValue} from "recoil";
import { useNavigate } from "react-router-dom";

function Header(){
    const [user, setUser] = useRecoilState(userState);
    const logOut = useRecoilValue(userClear);
    const navigate = useNavigate();
    const onClick = () => {
        logOut();
        setUser({});
        navigate('/');
        console.log('userClear : ',userClear)
    };

    if(user?.id){
        return (
            <header>
                <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
                <div className="utils">
                    <Link to='/mypage' className='primary'>My page</Link>
                    <button type="button" onClick={onClick}>Logout</button>
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