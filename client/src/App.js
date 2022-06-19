import {BrowserRouter, Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Register from "./Register";
// import Login from "./Login";
import LoginContainer from "./containers/Login";
import {useDispatch, useSelector} from "react-redux";
import {logoutFailure, logoutReqAction, logoutSuccess} from "./reducer/member";
import axios from "axios";
import MyPageContainer from "./containers/Mypage";
import Test from "./create";
import Free from "./Free";
import FreeView from "./FreeView";

export default function App() {
    //

    const {loginSuccess} = useSelector(state => state.member);

    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <div className="logo">
                        <Link to='/'>logo</Link>
                    </div>
                    {/*<div onClick={isUser}>ii</div>*/}
                    <Utils/>
                </header>
                <Navigation/>
                <div className="contents">

                    <Routes>
                        {/*<Route path="/test" element={<Test isLogin={loginSuccess}/>}/>*/}
                        <Route path="/free/:name" element={<FreeView/>}/>
                        <Route path="/free" element={<Free/>}/>
                        <Route path="/mypage" element={<MyPageContainer isLogin={loginSuccess}/>}/>
                        <Route path="/login" element={<LoginContainer isLogin={loginSuccess}/>}/>
                        <Route path="/register" element={<Register isLogin={loginSuccess}/>}/>
                        <Route path="/" exact element={<Main isLogin={loginSuccess}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                {/*<button type='button' onClick={setUser}>setToken</button>*/}
                {/*<button type='button' onClick={getFreeBoard}>getBoard</button>*/}
            </BrowserRouter>
        </div>
    )
}

function Navigation(){
    return (
        <div className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink
                to="/free"
                // className={({ isActive }) => (isActive ? 'primary' : 'secondary')}
            >Free
            </NavLink>
        </div>
    )
}

function Utils() {
    const navigate = useNavigate();
    const {loginSuccess} = useSelector(state => state.member);
    const dispatch = useDispatch();
    const logoutReq = () => dispatch(logoutReqAction());
    const logout = () => dispatch(logoutSuccess());
    const logoutFailed = () => dispatch(logoutFailure());

    const onSubmit = async (e) => {
        e.preventDefault();
        logoutReq();
        try {
            const res = await axios.get('/member/logout');
            const {success} = res.data;

            if (!success) {
                console.log('Err ', success)
                // return logoutFailed();
            }
            console.log('Success ', success);
            logout();
            return navigate('/');
        } catch (err) {
            logoutFailed();
            console.error(err.message);
        }
    }
    if (!loginSuccess) {
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