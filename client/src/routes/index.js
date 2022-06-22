import {Route, Routes} from "react-router-dom";
import MyPageContainer from "../containers/Mypage";
import LoginContainer from "../containers/Login";
import Register from "../Register";
import Main from "../Main";
import NotFound from "../NotFound";
import FreeRoutes from "./free";

export default function Routers(){
    return (
        <Routes>
            <Route path="/free/*" element={<FreeRoutes/>}/>
            <Route path="/mypage" element={<MyPageContainer/>}/>
            <Route path="/login" element={<LoginContainer/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" exact element={<Main/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}