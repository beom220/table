import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Test(props) {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        memberId: '1',
        title: '테스트제목',
        description: '테스트글',
        useComment: '1',
        disabled: '0',
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)
        // Object.values(inputs).map(v => console.log(v, v === null))
        // try {
        //     const res = await axios.post('/topics/free/create', inputs);
        //     const {success, message, topicId} = res.data;
        //
        //     if(!success){
        //         console.log(success);
        //         return alert(message);
        //     }
        //     alert(topicId);
        //     // return navigate('/');
        // } catch (err) {
        //     console.error(err.message);
        // }
    }

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    return (
        <div className="login-form">
            <div className="box-header">
                CREATE TEST
            </div>
            <form action="" onSubmit={onSubmit}>
                <div>
                    <p>disabled</p>
                    <div>
                        <input type="radio" value="1" name="disabled" onChange={onChange}/>
                        <span>Yes</span>
                    </div>
                    <div>
                        <input type="radio" value="0" name="disabled" checked onChange={onChange}/>
                        <span>No</span>
                    </div>
                </div>

                <div>
                    <p>useComment</p>
                    <div>
                        <input type="radio" value="0" name="useComment" checked onChange={onChange}/>
                        <span>Yes</span>
                    </div>
                    <div>
                        <input type="radio" value="1" name="useComment" onChange={onChange}/>
                        <span>No</span>
                    </div>
                </div>

                <button type="submit" className='emphasis'>생성</button>
                <button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>
            </form>
        </div>
    )
}
