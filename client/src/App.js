import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Main from "./Main";
import NotFound from "./NotFound";
import Register from "./Register";
// import Login from "./Login";
import LoginContainer from "./containers/Login";
import {useDispatch, useSelector} from "react-redux";
import {logoutFailure, logoutReqAction, logoutSuccess} from "./reducer/member";
import axios from "axios";
import MyPageContainer from "./containers/Mypage";


export default function App() {
    const {loginSuccess} = useSelector(state => state.member);

    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <div className="logo">
                        <Link to='/'>logo</Link>
                    </div>
                    <Utils/>
                </header>
                <Routes>
                    <Route path="/mypage" element={<MyPageContainer isLogin={loginSuccess}/>}/>
                    <Route path="/login" element={<LoginContainer isLogin={loginSuccess}/>}/>
                    <Route path="/register" element={<Register isLogin={loginSuccess}/>}/>
                    <Route path="/" exact element={<Main isLogin={loginSuccess}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function Utils(){
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
            const { success } = res.data;

            if (!success) {
                console.log('Err ', success)
                return logoutFailed();
            }
            console.log('Success ', success);
            logout();
            return navigate('/');
        } catch (err) {
            logoutFailed();
            console.error(err.message);
        }
    }
    if(!loginSuccess){
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