import {atom, selector, useRecoilState, useRecoilValue} from "recoil";
import axios from "axios";

export const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: {},
});

export const currentUserNameQuery = selector({
    key: 'CurrentUserName',
    get: async ({get}) => {
        const response = await axios.get('/api/member/',{
                userID: get(currentUserIDState),
            });
        // console.log(response)
        console.log('ID STATE : ',currentUserIDState);
        return response.data.user;
    },
});

export function CurrentUserInfo() {
    const user = useRecoilValue(currentUserNameQuery);
    if(!user){
        return <div>not user</div>
    }
    const { id, email } = user;
    return <div>email : {email}</div>;
}