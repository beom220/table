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
import Test from "./create";

export default function App() {
    const {loginSuccess} = useSelector(state => state.member);

    // 세션정보 받음 TODO 세션스토리지 리덕스 연계
    const setToken = async () => {
        try {
            const res = await axios.get('/member');
            const { success , session } = res.data;
            if(!success){
                console.log('no user')
                console.log('session', session)
                // return null;
            }
            console.log('session');
            console.log(session);
            console.log('passport len', !session.passport? session.passport : 'none')
            console.log('---cookie---');
            console.log(session.cookie);
            console.log('passport');
            console.log(session.passport);
            if(!session.passport){
                console.log('nope user')
            }
            if(session.passport){
                console.log('session success~~~')
                sessionStorage.setItem('key', session.passport.user)
            }

        } catch (err) {
            console.error(err);
        }
    }


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
                    {/*<Route path="/test" element={<Test isLogin={loginSuccess}/>}/>*/}
                    <Route path="/mypage" element={<MyPageContainer isLogin={loginSuccess}/>}/>
                    <Route path="/login" element={<LoginContainer isLogin={loginSuccess}/>}/>
                    <Route path="/register" element={<Register isLogin={loginSuccess}/>}/>
                    <Route path="/" exact element={<Main isLogin={loginSuccess}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <button type='button' onClick={setToken}>setToken</button>
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