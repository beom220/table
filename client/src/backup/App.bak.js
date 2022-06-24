import {BrowserRouter, Link, NavLink, useNavigate} from "react-router-dom";
import logo from "./logo.webp";
import Routers from "./routes";
import axios from "axios";

export default function App(){

    const logoStyle = {
        height : '30px',
        width : 'auto',
        transform: 'rotate(325deg)'
    }

    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" style={logoStyle}/>
                        </Link>
                    </div>
                    <Utils/>
                </header>
                <Navigation/>
                <div className="contents">
                    <Routers/>
                </div>
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

function Utils({isSignOut}) {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        // logoutReq();
        try {
            const res = await axios.get('/api/member/logout');
            const {success} = res.data;

            if (!success) {
                return console.log('Err ', success)
            }
            console.log('Success ', success);
            return navigate('/');
        } catch (err) {
            console.error(err.message);
        }
    }
    // if (isSignOut) {
        return (
            <div className="utils">
                <Link to='/login' className='primary'>Login</Link>
            </div>
        )
    // }
    // return (
    //     <div className="utils">
    //         <Link to='/mypage' className='primary'>MyPage</Link>
    //         <button type='button' className='secondary' onClick={onSubmit}>Logout</button>
    //     </div>
    // )
}