import {Route, Routes} from "react-router-dom";
import Main from "../pages/main";
import NotFound from "../pages/error/NotFound";

export default function Routers(){
    return (
        <Routes>
            {/*<Route path="/free/*" element={<FreeRoutes/>}/>*/}
            {/*<Route path="/mypage" element={<MyPageContainer/>}/>*/}
            {/*<Route path="/login" element={<LoginContainer/>}/>*/}
            {/*<Route path="/register" element={<Register/>}/>*/}
            <Route path="/" exact element={<Main/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}