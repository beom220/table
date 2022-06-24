//
// import { BrowserRouter, Link, NavLink } from "react-router-dom";
// import Routers from "./routes";
//
// import Test from "./pages/test/test";
// import {TempCelcius} from "./recoil/counter/example";
// import {ResultSection} from "./recoil/topic/topic";
// import Login from "./pages/test/Login";
import {RecoilRoot, useRecoilState, useRecoilValue} from "recoil";
// import {ResultSection} from "./recoil/topic/topic";
import {currentUserIDState, CurrentUserInfo, currentUserNameQuery} from "./recoil/member/member";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";
import Routers from "./routes";

export default function App(){
    return (
        <RecoilRoot>
            <ErrorBoundary fallback={<Error/>}>
                <Suspense fallback={<Loading/>}>
                    <Routers/>
                    {/*<ResultSection/>*/}
                    <Logger/>
                    <CurrentUserInfo/>
                </Suspense>
            </ErrorBoundary>
        </RecoilRoot>
    )
}
function Logger(){
    const [logger, setLogger] = useRecoilState(currentUserIDState);
    const [current, setCurrent ] = useRecoilState(currentUserNameQuery);

    console.log(logger)
    console.log(current);
    // return <p>{logger}</p>
}

function Loading(){
    return <div>Loading...</div>
}

function Error(){
    return <div>Error...</div>
}

// <BrowserRouter>
//     <Routers/>
// </BrowserRouter>