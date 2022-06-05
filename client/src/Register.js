import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Register(props) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(props.isLogin) navigate('/');
    }, [props.isLogin])

    const today = () => {
        const year = new Date().getFullYear();
        const month = ("0" + (1 + new Date().getMonth())).slice(-2);
        const date = ("0" + new Date().getDate()).slice(-2);
        return year + month + date;
    };

    const [modal, setModal] = useState(false);
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


    const controlModal = () => {
        setModal(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs)
        axios.post('http://localhost:3001/register', inputs)
            .then(res => {
                if (!res.data.success) {
                    console.log(res.data);
                    return setModal(true)
                }
                if (res.data.success) {
                    return navigate('/');
                }
            })
    }
    // TODO form value Check

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <input type="text" name="name" placeholder='이름을 입력해주세요' onChange={onChange}/>
                <input type="email" name="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                <input type="password" name="password" placeholder='비밀번호를 입력해주세요' onChange={onChange}/>
                <input type="text" name="birth" placeholder='생년월일을 입력해주세요' onChange={onChange}/>
                <input type="tel" name="phone" placeholder='휴대폰번호를 입력해주세요' onChange={onChange}/>
                <input type="text" name="nickname" placeholder='닉네임을 입력해주세요' onChange={onChange}/>
                <input type="email" name="uEmail" placeholder='이메일을 입력해주세요' onChange={onChange}/>
                <input type="text" name="agreeAt" value={inputs.agreeAt} readOnly/>
                <button type="submit">가입</button>
            </form>
            <Modal modal={modal} onClick={controlModal}/>
        </>
    )
}

function Modal(props) {
    // TODO duplicate CSS
    const modalBg = {
        'position': 'fixed',
        'width': '100%',
        'height': '100vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'background': 'rgba(0,0,0,.6)'
    }
    const modalStyled = {
        'position': 'fixed',
        'width': '200px',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'background': 'white',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center'
    }
    if (!props.modal) {
        return null
    }
    if (props.modal) {
        setTimeout(()=>{
            return (
                <div style={modalBg}>
                    <div style={modalStyled}>
                        <p>틀렸다~</p>
                        <button type='button' onClick={props.onClick}>
                            확인
                        </button>
                    </div>
                </div>
            )
        }, 20);
    }
}