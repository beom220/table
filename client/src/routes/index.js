import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../pages/main";
import NotFound from "../pages/error/NotFound";

import Login from "../pages/test/Login";
export default function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                {/*<Route path="/register" element={<Register/>}/>*/}
                <Route path="/" exact element={<Main/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}