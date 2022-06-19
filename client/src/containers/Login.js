import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Login from "../components/Login";
import {loginFailure, loginReqAction, loginSuccess} from "../reducer/member";

export default function LoginContainer(props) {
    const dispatch = useDispatch();
    const loginReq = () => dispatch(loginReqAction());
    const login = (user) => dispatch(loginSuccess(user));
    const loginFailed = () => dispatch(loginFailure());
    const {loginLoading} = useSelector(state => state.member);
    return (
        <Login
            loginReq={loginReq}
            login={login}
            loginFailed={loginFailed}
            loading={loginLoading}
            isLogin={props.isLogin}
        />
    );
}
