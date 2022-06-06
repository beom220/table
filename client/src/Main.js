import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {logoutFailure, logoutReqAction, logoutSuccess} from "./reducer/member";


export default function Main(props) {
    const navigate = useNavigate();
    const {user, logoutLoading} = useSelector(state => state.member);

    const dispatch = useDispatch();
    const logoutReq = () => dispatch(logoutReqAction());
    const logout = () => dispatch(logoutSuccess());
    const logoutFailed = () => dispatch(logoutFailure());

    const onSubmit = async (e) => {
        e.preventDefault();
        logoutReq();
        try {
            const res = await axios.get('/member/logout');
            const { success } = res.data;

            if (!success) {
                console.log('Err ', success)
                return logoutFailed();
            }
            console.log('Success ', success);
            logout();
            return navigate('/');
        } catch (err) {
            logoutFailed();
            console.error(err.message);
        }
    }

    if (!props.isLogin) {
        return (
            <>
                <p>로그인 하세요</p>
                <Link to="/login">
                    <li>로그인</li>
                </Link>
                <Link to="/register">
                    <li>회원가입</li>
                </Link>
            </>
        );
    }

    if (logoutLoading) {
        return <p>waiting...</p>
    }

    return (
        <>
            <h2>안녕하세요</h2>
            <p>{user.nickname}님</p>
            <button type="submit" onClick={onSubmit}>로그아웃</button>
        </>
    );

};

