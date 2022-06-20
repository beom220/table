import {Route, Routes} from "react-router-dom";
import Free from "../Free";
import FreeView from "../FreeView";
import FreeCreate from "../FreeCreate";
import FreeUpdate from "../FreeUpdate";

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
