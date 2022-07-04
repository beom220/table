import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    const today = () => {
        const year = new Date().getFullYear();
        const month = ("0" + (1 + new Date().getMonth())).slice(-2);
        const date = ("0" + new Date().getDate()).slice(-2);
        return year + month + date;
    };

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        birth: '',
        phone: '',
        nickname: '',
        uEmail: '',
        agreeAt: today(),
    });

    // const {name, email, password, birth, phone, nickname, uEmail, agreeAt} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const formCheck = () => {
        const name = /^[가-힣]{2,20}$/; /* 한글만 */
        const nickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,12}$/; /* 4 ~ 12 자 한글포함 */
        const password = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+]{8,20}$/; /* 8 ~ 20 자 특수문자,숫자,영어허용*/
        const birth = /^[12]\d{7}$/; /* 숫자만 8자 */
        const phone = /^(01)[01679]\d{3,4}\d{4}$/; /* 숫자만 */
        const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;


        if(!name.test(inputs.name)) {
            alert('name 삐빅');
            return false;
        }
        if(!email.test(inputs.email)) {
            alert('email 삐빅');
            return false;
        }
        if(!password.test(inputs.password)) {
            alert('pwd 삐빅');
            return false;
        }
        if(!nickname.test(inputs.nickname)) {
            alert('nickname 삐빅');
            return false;
        }
        if(!birth.test(inputs.birth)) {
            alert('birth 삐빅');
            return false;
        }
        if(!phone.test(inputs.phone)) {
            alert('phone 삐빅');
            return false;
        }
        if(!email.test(inputs.uEmail)) {
            alert('uEmail 삐빅');
            return false;
        }
        console.log('all pass');
        return true;
    }

    // TODO 생성한 정보로 로그인하기
    const onSubmit = async (e) => {
        e.preventDefault();
        if(!formCheck()) return;

        try {
            const res = await axios.post('/api/register', inputs);
            const {success, message} = res.data;

            if(!success){
                console.log(success);
                return alert(message);
            }
            alert(message);
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="box-header">
                Join to Company
            </div>
            <form action="" onSubmit={onSubmit}>
                <div className="single">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" placeholder='이름을 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder='비밀번호를 입력해주세요' onChange={onChange} autoComplete="new-password"/>
                </div>
                <div className="single">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" name="nickname" id="nickname"  placeholder='닉네임을 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="birth">생년월일</label>
                    <input type="text" name="birth" id="birth" placeholder='생년월일을 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="phone">휴대폰번호</label>
                    <input type="tel" name="phone"  id="phone" placeholder='휴대폰번호를 입력해주세요' onChange={onChange}/>
                </div>
                <div className="single">
                    <label htmlFor="uEmail">인증받을 이메일</label>
                    <input type="email" name="uEmail" id="uEmail"  placeholder='이메일을 입력해주세요' onChange={onChange}/>
                </div>

                <div className="single">
                    <label htmlFor="agreeAt">가입일</label>
                    <input type="text" name="agreeAt" id="agreeAt" value={inputs.agreeAt} readOnly/>
                </div>


                <button type="submit" className='emphasis'>회원가입</button>
                <button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>
            </form>
        </>
    )
}
