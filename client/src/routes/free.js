import {Route, Routes} from "react-router-dom";
import Free from "../pages/topic/Free";
import FreeView from "../pages/topic/FreeView";
import FreeCreate from "../pages/topic/FreeCreate";
import FreeUpdate from "../pages/topic/FreeUpdate";

export default function FreeRoutes(){
    return (
        <Routes>
            <Route path="/update/:name" element={<FreeUpdate/>}/>
            <Route path="/create" element={<FreeCreate/>}/>
            <Route path="/:name" element={<FreeView/>}/>
            <Route path="/" element={<Free/>}/>
        </Routes>
    )
}
