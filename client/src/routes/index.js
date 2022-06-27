import { Navigate, Route, Routes} from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/member/Login";
import FreeRoutes from "./free";
import { Notfound } from "../pages/utils/utils";
import Register from "../pages/member/Register";
import {useRecoilValue} from "recoil";
import {memberState} from "../recoil/member/authorize";


function PublicRoute(){
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route path="/free/*" element={<FreeRoutes/>}/>
            <Route path="/register"
                   element={!member ? <Register/> : <Navigate to="/"/>}
            />
            <Route path="/login"
                   element={!member ? <Login/> : <Navigate to="/"/>}
            />
            <Route path="/" exact element={<Main/>}/>
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
