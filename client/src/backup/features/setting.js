import {useQueryClient} from "react-query";
import {useState} from "react";

function Setting(){
    const [username, setUsername] = useState('');
    const queryClient = useQueryClient();

    const handleClick = () => queryClient.setQueryData('username', username);
    return (
        <div className="setting">
            <input
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
            />
            <button
                onClick={handleClick}
            >
                update
            </button>
        </div>
    );
}

export default Setting;
