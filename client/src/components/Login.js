import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";


export default function Login({loginReq, login, loginFailed, loading, isLogin}) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(isLogin) {
            alert('you cannot access');
            return navigate('/');
        }
    }, [])

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
        loginReq();
        if (!formCheck()) return loginFailed();


        try {
            const res = await axios.post('/member/login', inputs)
            const {success} = res.data;

            if (!success) {
                loginFailed();
                return alert('wrong info')
            }

            const {user} = res.data;
            login(user);
            return navigate('/');
        } catch (err) {
            console.error(err.message);
            return loginFailed();
        }
    }

    if (loading) return (<><p>Loading...</p></>);

    return (
        <div className="login-form">
            <div className="box-header">
                Sign in to Company
            </div>
            <form action="" onSubmit={onSubmit}>
                <input type="email" name="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                <input type="password" name="password" placeholder='비밀번호를 입력해주세요' onChange={onChange}/>

                <button type="submit" className='primary'>로그인</button>
                <Link to='/register' className='emphasis'>회원가입</Link>
                <Link to='/' className='secondary'>뒤로가기</Link>

                {/*<button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>*/}
            </form>
        </div>
    )

}