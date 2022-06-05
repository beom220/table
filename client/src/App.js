import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./Main";
import NotFound from "./NotFound";
import Register from "./Register";
import Welcome from "./Welcome";
// import Login from "./Login";
import LoginContainer from "./containers/Login";
import {useSelector} from "react-redux";


export default function App(props) {
    const {loginSuccess} = useSelector(state => state.member);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/welcome" element={<Welcome isLogin={loginSuccess}/>}/>
                    <Route path="/login" element={<LoginContainer isLogin={loginSuccess}/>}/>
                    <Route path="/register" element={<Register isLogin={loginSuccess}/>}/>
                    <Route path="/" exact element={<Main isLogin={loginSuccess}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}