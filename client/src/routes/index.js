import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/member/Login";
import FreeRoutes from "./free";
import { Notfound } from "../pages/utils/utils";

// Fixme useState 조건적인 구문 사용 불가 => Route 에서 UserCheck
function PublicRoute(){
    return (
        <Routes>
            <Route path="/free/*" element={<FreeRoutes/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" exact element={<Main/>}/>
            {/*<Route path="/register" element={<Register/>}/>*/}
            <Route path="*" element={<Notfound/>}/>
        </Routes>
    )
}

function PrivateRoute(){
    return (
        <Routes>
            <Route path="/free/*" element={<FreeRoutes/>}/>
            {/*<Route path="/login" element={<Login/>}/>*/}
            <Route path="/" exact element={<Main/>}/>
            {/*<Route path="/register" element={<Register/>}/>*/}
            <Route path="*" element={<Notfound/>}/>
        </Routes>
    )
}


export { PublicRoute }
