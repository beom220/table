import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginFailure} from "../reducer/member";

export default function Login({loginReq, login, loginFailed, loading}) {

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

    const onSubmit = e => {
        e.preventDefault();
        loginReq();
        axios.post('/member/login', inputs)
            .then(res => {
                const {user} = res.data;
                return login(user)
            })
            .then(data => {
                console.log(data)
                return data.user;
            })
            .then(user => {
                if (!loginFailed()) {
                    loginFailed();
                    return alert('error')
                }
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
                loginFailed();
            })
    }

    if (!loading) {
        return (
            <>
                <form action="" onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                    <input type="password" name="password" placeholder='비밀번호를 입력해주세요' onChange={onChange}/>
                    <button type="submit">로그인</button>
                </form>
            </>
        )
    }
    return (
        <>
            <p>Loading...</p>
        </>
    )

}