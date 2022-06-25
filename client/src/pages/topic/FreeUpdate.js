import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function FreeUpdate(){
    const params = useParams();
    const param = params.name? params.name : false;

    const [ data, setData ] = useState({});
    const [ dataCount, setDataCount] = useState('');
    console.log('free update')
    // TODO boardTable 생성
    const getFreeBoard = async () => {
        if(!param) {
            try {
                const res = await axios.get('/api/topics/free');
                const {success, message} = res.data;

                if (!success) {
                    console.log('에러뜸')
                }
                console.log(res.data)
                setData(message);
                setDataCount(message.length);
            } catch (err){
                console.error(err);
            }
            // return console.log('no id')
        }
        try {
            const res = await axios.get('/api/topics/free/' + param);
            const {success, message} = res.data;

            if (!success) {
                console.log('에러뜸')
            }
            console.log(res.data)
            setData(message);
            // return console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFreeBoard();
    },[])

    //
    const [inputs, setInputs] = useState({
        title:'',
        description:'',
        memberId : '2',
        useComment : '1',
        disabled : '0',
    });
    const { memberId, useComment, disabled } = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onCheck = (e) => {
        const {checked, name} = e.target;
        setInputs({
            ...inputs,
            [name] : String(Number(!!checked))
        })
    }



    if(!param){
        console.log(data);

        return (
            <div className="board">
                <h1 className="title">Free Board</h1>
            </div>
        )
    }

    if(data){
        return (
            <>
                <h1>업데이트</h1>
                <h2>match URL : {param}</h2>
                <form action="" >
                    <input type="text" name="memberId" value={data.id} readOnly/>
                    <input type="text" name="title" placeholder="글 제목을 입력해주세요" value={data.title} readOnly/>
                    <textarea name="description" placeholder="글 내용을 입력해주세요" defaultValue={data.description}/>
                    <label htmlFor="comment" className="check-box">
                        <input type="checkbox" id="comment" name="useComment" onChange={onCheck}
                               checked={!!Number(useComment)}
                        />
                        <span>댓글 사용함</span>
                    </label>
                    <label htmlFor="disabled" className="check-box">
                        <input type="checkbox" id="disabled" name="disabled" onChange={onCheck}/>
                        <span>작성글 공개안함</span>
                    </label>
                    <button type="submit" className='primary'>업데이트</button>
                    {/*<button type="button" className='secondary' onClick={() => navigate(-1)}>뒤로가기</button>*/}
                </form>
            </>
        );
    }
}