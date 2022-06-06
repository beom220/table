import {useDispatch, useSelector} from 'react-redux';
import MyPage from "../components/Mypage";
import {loginFailure, loginReqAction, loginSuccess} from "../reducer/member";

export default function MyPageContainer(props) {
    const {user} = useSelector(state => state.member);
    const dispatch = useDispatch();
    // const loginReq = () => dispatch(loginReqAction());
    // const login = (user) => dispatch(loginSuccess(user));
    // const loginFailed = () => dispatch(loginFailure());
    // const {loginLoading} = useSelector(state => state.member);

    return (
        <MyPage isLogin={props.isLogin} user={user}/>
    );
}
