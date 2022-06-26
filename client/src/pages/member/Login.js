import axios from "axios";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {memberState} from "../../recoil/member/authorize";
import {useRecoilState} from "recoil";

export default function Login() {
    const [member, setMember] = useRecoilState(memberState);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
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
        const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if (!email.test(inputs.email)) {
            alert('email 삐빅');
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
        if (!formCheck()) return false;
        try {
            const res = await axios.post('/api/member/login', inputs)
            const {success, user} = res.data;

            if (!success) {
                return alert('wrong info')
            }
            setMember(user);
            navigate(-1);

        } catch (error) { throw error }
    }

    return (
        <div className="login-form">
            <div className="box-header">
                Sign in to Company
            </div>
            <form action="" onSubmit={onSubmit}>
                <div className="single">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder='비밀번호를 입력해주세요' onChange={onChange}/>
                </div>


                <button type="submit" className='primary'>로그인</button>
                <Link to='/register' className='emphasis'>회원가입</Link>
                <Link to='/' className='secondary'>취소</Link>
            </form>
        </div>
    )
}