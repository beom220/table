import { Route, Routes, Navigate} from "react-router-dom";
import Free from "../pages/topic/Free";
import FreeView from "../pages/topic/FreeView";
import FreeCreate from "../pages/topic/FreeCreate";
import FreeUpdate from "../pages/topic/FreeUpdate";
import {useRecoilValue} from "recoil";
import {memberState} from "../recoil/member/authorize";

export default function FreeRoutes(){
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route
                path="/update/:name"
                element={member ? <FreeUpdate/> : <Navigate replace to="/login"/>}
            />
            <Route path="/create"
                   element={member ? <FreeCreate/> : <Navigate replace to="/login"/>}
            />
            <Route path="/:name" element={<FreeView/>}/>
            <Route path="/" element={<Free/>}/>
        </Routes>
    )
}
