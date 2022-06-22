import {BrowserRouter,  Link, useNavigate} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutFailure, logoutReqAction, logoutSuccess} from "./reducer/member";
import axios from "axios";
import Routers from "./routes";
import logo from './logo.webp';
import {useEffect, useState} from "react";

export default function App() {
    // 아래 정보 스토리지에 저장 & 리덕스로,
    const [user, setUser] = useState({});
    const getUser = async () => {
        try {
            const res = await axios.get('/api/member');
            const {success, user} = res.data;

            if (!success) {
                console.log('에러뜸')
            }
            console.log(res.data)
            setUser(user)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(()=>{
        getUser();
    },[])
    const controlSetUser = () => {
        setUser('');
    }

    const logoStyle = {
        height : '30px',
        width : 'auto',
        transform: 'rotate(325deg)'
    }

    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt="logo" style={logoStyle}/>
                        </Link>
                    </div>
                    <Utils user={user} clearUser={() => controlSetUser()}/>
                </header>
                <Navigation/>
                <div className="contents">
                    <Routers/>
                </div>
            </BrowserRouter>
        </div>
    )
}

function Navigation(){
    return (
        <div className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/free">Free</NavLink>
        </div>
    )
}

function Utils({user, clearUser}) {
    const userOut = () => clearUser();

    const navigate = useNavigate();
    // const {loginSuccess} = useSelector(state => state.member);
    const dispatch = useDispatch();
    const logoutReq = () => dispatch(logoutReqAction());
    const logout = () => dispatch(logoutSuccess());
    const logoutFailed = () => dispatch(logoutFailure());

    const onSubmit = async (e) => {
        e.preventDefault();
        logoutReq();
        try {
            const res = await axios.get('/api/member/logout');
            const {success} = res.data;

            if (!success) {
                console.log('Err ', success)
                return logoutFailed();
            }
            console.log('Success ', success);
            userOut();
            logout();
            return navigate('/');
        } catch (err) {
            logoutFailed();
            console.error(err.message);
        }
    }
    if (!user) {
        return (
            <div className="utils">
                <Link to='/login' className='primary'>Login</Link>
            </div>
        )
    }
    return (
        <div className="utils">
            <Link to='/mypage' className='primary'>MyPage</Link>
            <button type='button' className='secondary' onClick={onSubmit}>Logout</button>
        </div>
    )
}