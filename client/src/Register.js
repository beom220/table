import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Register(props) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(props.isLogin) {
            alert('you cannot access');
            return navigate('/');
        }
    }, [])

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

    const [modal, setModal] = useState(false);
    const controlModal = () => {
        setModal(false);
    }

    const formCheck = () => {
        const name = /^[가-힣]{2,20}$/; /* 한글만 */
        const nickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,12}$/; /* 4 ~ 12 자 한글포함 */
        const password = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+]{8,20}$/; /* 8 ~ 20 자 특수문자,숫자,영어허용*/
        const birth = /^[12]\d{7}$/; /* 숫자만 8자 */
        const phone = /^(01)[01679]\d{3,4}\d{4}$/; /* 숫자만 */
        const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if(!name.test(inputs.name)) {
            alert('name 삐빅')
            return false;
        }
        if(!nickname.test(inputs.nickname)) {
            alert('nickname 삐빅');
            return false;
        }
        if(!password.test(inputs.password)) {
            alert('pwd 삐빅');
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
        if(!email.test(inputs.email)) {
            alert('email 삐빅');
            return false;
        }
        if(!email.test(inputs.uEmail)) {
            alert('uEmail 삐빅');
            return false;
        }
        console.log('all pass');
        return true;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!formCheck()) return false;

        try {
            const res = await axios.post('/register', inputs);
            const {success} = res.data;

            if(!success){
                console.log(success);
                return setModal(true);
            }
            return navigate('/');
        } catch (err) {
            console.error(err.message);
        }
    }

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
                <button type="button" onClick={() => navigate(-1)}>뒤로가기</button>
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