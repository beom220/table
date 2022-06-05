import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";


export default function Main(props) {
    const { loginSuccess, user } = useSelector(state => state.member);
    console.log(loginSuccess)
    console.log(user)
    if (!props.isLogin) {
        return (
            <>
                <p>로그인 하세요</p>
                <Link to="/login">
                    <li>로그인</li>
                </Link>
                <Link to="/Register">
                    <li>회원가입</li>
                </Link>
            </>
        );
    }

    return (
        <>
            <h2>안녕하세요</h2>
            <p>{user.nickname}님</p>
            <ul>
                <Link to="/logout">
                    <li>로그아웃</li>
                </Link>
            </ul>
        </>
    );

};

