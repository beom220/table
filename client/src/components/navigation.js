import {NavLink} from "react-router-dom";

export function Navigation(){
    return (
        <div className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/free">Free</NavLink>
        </div>
    )
}