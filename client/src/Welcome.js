import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Welcome() {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {

    },[state])

    const onSubmit = (e) => {
        e.preventDefault();
        axios.get('/member/logout')
            .then(res => {
                if(!res.data.success){
                    console.log('Err ',res.data.success)
                }
                console.log('Success ',res.data.success)
                return navigate('/');
            })
    }

    return (
        <>
            <h1>WelCome</h1>
            <p>닉네임 : {state.nickname}</p>
            <p>이메일 : {state.email}</p>
            <form action="" onSubmit={onSubmit}>
                <button type="submit">로그아웃</button>
            </form>
        </>
    )
}