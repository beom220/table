import {authorInputs, authorState, authorStateSelector} from "../../recoil/member/authorize";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import axios from "axios";


// TODO
function Authorize(){
    const authorStates = useRecoilValue(authorStateSelector);
    const resetMember = useResetRecoilState(authorState);
    const [member, setMember] = useRecoilState(authorState);
    const [info, setInfo ] = useRecoilState(authorInputs);


    const onChange = e => {
        const {value, name} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('api/member/login', info);
            const {user, success } = res.data;
            if(!success){
                alert('you are not user');
                return false;
            }
            const {id, email, grade } = user;
            setMember({
                id : id,
                email : email,
                grade : grade,
                isLogger : success,
            });
            console.log(member);
            console.log(authorStates)
        } catch (e) {console.log(e)}
    }

    const onLogout = async e => {
        try {
            const res = await axios.get('/api/member/logout');
            const {success} = res.data;

            if (!success) {
                return console.log('Err ', success)
            }
            resetMember();
            console.log('Success ', success);
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <h2>authorState : {String(authorStates.email)}</h2>
            <br/><br/>
            <h2>authorInfo</h2>
            <input type="email" name="email" placeholder='이메일을 입력해주세요' onChange={onChange}/>
            <input type="password" name="password" placeholder='비밀번호를 입력해주세요' onChange={onChange}/>
            <br/><br/>
            <input type="submit" value="완료"/>
            <button type="button" onClick={onLogout}>로그아웃</button>
        </form>
    )
}

export { Authorize };