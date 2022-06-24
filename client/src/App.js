import { BrowserRouter, Link, NavLink } from "react-router-dom";
import Routers from "./routes";

export default function App(){

    return (
        <div className="app">
            <BrowserRouter>
                <Routers/>
            </BrowserRouter>
        </div>
    )
}

function Navigation(){
    return (
        <div className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/free">Free</NavLink>
        </div>
    )
}