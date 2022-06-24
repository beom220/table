import { useQuery } from 'react-query';

function Profile() {
    const { data: username } = useQuery('username', {
        initialData: '',
        staleTime: Infinity,
    });

    return (<div className="profile"><h1>{username}</h1></div>);
}

export default Profile;
