import { BrowserRouter, Link, NavLink } from "react-router-dom";
import Routers from "./routes";
import {RecoilRoot} from "recoil";
import Test from "./pages/test/test";
import {TempCelcius} from "./recoil/counter/example";

export default function App(){
    return (
        <RecoilRoot>
            <Test/>
            <TempCelcius/>
        </RecoilRoot>
    )
}
// <BrowserRouter>
//     <Routers/>
// </BrowserRouter>