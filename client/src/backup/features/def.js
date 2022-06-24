import {useQuery} from "react-query";
import axios from "axios";
import {useState} from "react";


    // const [author, setAuthor] = useState({});
    const topicApi = () => {
        return axios.get('/api/topics/free/1');
    }
    const memberApi = () => {
        return axios.get('/api/member');
    };

    const ParallelQueries = () => {
        const topics = useQuery('topic', topicApi);
        const members = useQuery('member', memberApi);
        console.log('topics :',topics);
        console.log('members : ',members);
        // return (
        //     <>
        //         {topics.data?.data.map(topic => (
        //             <div key={topic.id}>{topic.title}</div>
        //         ))}
        //
        //         {members.data?.data.map(member => (
        //             <div key={member.id}>{member.email}</div>
        //         ))}
        //     </>
        // )
    }

export default ParallelQueries;

// const responseData = useQuery('topic', topicApi);
// console.log(responseData)
// const {data, isLoading, isFetching, isError, error} = useQuery('topic', topicApi);

// console.log('isFetching : ',isFetching)
// console.log('isLoading : ', isLoading)
// console.log('data : ', data)

// if (isLoading) return (<h2>Loading</h2>)
//
// return (
//     <div className="asdfasdf">
//         <p>{data.data.id}</p>
//         <p>{data.data.email}</p>
//     </div>
// )
// setAuthor(data.data.user);
// console.log('author : ',author)
// if(!author) return (<p>No author</p>)