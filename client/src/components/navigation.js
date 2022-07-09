import {NavLink} from "react-router-dom";
import pages from "./utils/pages";

export function Navigation(){
    return (
        <nav className="navigation">
            {pages.map((v, i)  => {
                return <NavLink to={v.link} key={i}>{v.name}</NavLink>
            })}
        </nav>
    )
}