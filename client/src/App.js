import {RecoilRoot, useRecoilState, useRecoilValue} from "recoil";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";
import Routers from "./routes";
import {Authorize} from "./pages/test/authorize";
import {authorStateSelector} from "./recoil/member/authorize";

export default function App(){
    return (
        <RecoilRoot>
            <ErrorBoundary fallback={<Error/>}>
                <Suspense fallback={<Loading/>}>
                    <Routers/>
                    <Logger/>
                    <Authorize/>
                </Suspense>
            </ErrorBoundary>
        </RecoilRoot>
    )
}

function Loading(){
    return <div>Loading...</div>
}

function Error(){
    return <div>Error...</div>
}




function Logger(){
    const authorStates = useRecoilValue(authorStateSelector);
    const { id, email, grade ,isLogger} = authorStates;
    console.log('logger- isLogger: ',isLogger)
    return (
        <>
            <p>email : {email}</p>
            <p>isLogger : {String(isLogger)}</p>
        </>
    )
}
//

// <BrowserRouter>
//     <Routers/>
// </BrowserRouter>