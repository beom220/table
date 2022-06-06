import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutFailure, logoutReqAction, logoutSuccess} from "../reducer/member";


export default function MyPage({isLogin, user}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutReq = () => dispatch(logoutReqAction());
    const logout = () => dispatch(logoutSuccess());
    const logoutFailed = () => dispatch(logoutFailure());

    useEffect(()=>{
        if(!isLogin) {
            alert('cannot access');
            return navigate('/');
        }
    },[])

    const [inputs, setInputs] = useState({
        nickname: '',
        password: '',
        id : user.id
    });

    const onChange = e => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const formCheck = () => {
        // const password = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+]{8,20}$/; /* 8 ~ 20 자 특수문자,숫자,영어허용*/
        const password = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+]{4,20}$/; /* 임시 */
        const nickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,12}$/; /* 4 ~ 12 자 한글포함 */

        if (!nickname.test(inputs.nickname)) {
            alert('nickname 삐빅');
            return false;
        }

        if (!password.test(inputs.password)) {
            alert('pwd 삐빅');
            return false;
        }
        console.log('all pass');
        return true;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        logoutReq();
        if (!formCheck()) return logoutFailed();

        try {
            const res = await axios.post('/member/update', inputs)
            const {success} = res.data;

            if (!success) {
                console.log('Err ', success)
                return logoutFailed();
            }
            console.log(success);
            alert('다시 로그인 해주세요');
            logout();
            return navigate('/login');
        } catch (err) {
            console.error(err.message);
            return logoutFailed();
        }
    }

    return (
        <div className="login-form">
            <div className="box-header">
                MyPage
            </div>

            <form action="" onSubmit={onSubmit}>
                <div>
                    <h2>{user.nickname}님</h2>
                </div>
                <input type="hidden" name="id" value={user.id || ''} readOnly disabled/>
                <div className="single">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" name="nickname" id='nickname' placeholder='변경하실 닉네임을 입력해주세요' onChange={onChange}/>
                </div>

                <div className="single">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder='변경하실 비밀번호를 입력해주세요' onChange={onChange}/>
                </div>


                <button type="submit" className='primary'>업데이트</button>
                <Link to='/' className='secondary'>뒤로가기</Link>

                {/*<button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>*/}
            </form>
        </div>
    )

}