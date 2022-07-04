import {useRecoilValue} from "recoil";
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {DebugObserver} from "./components/utils/debug";
import {PrivateRoute, PublicRoute} from "./routes";
import {Error, Loading} from "./pages/utils/utils";
import {Header} from "./components/header";
import {Navigation} from "./components/navigation";
import {memberState} from "./recoil/member/authorize";
import Contents from "./components/contents";


export default function App() {
    const member = useRecoilValue(memberState);
    console.log(member?.grade);
    return (

        <Suspense fallback={<Loading/>}>
            <DebugObserver/>
            <BrowserRouter>
                <Suspense fallback={<Loading/>}>
                    <Header/>
                    <Navigation/>
                    <ErrorBoundary fallback={<Error/>}>
                        <Suspense fallback={<Loading/>}>
                            <Contents>
                                {member?.grade === 5 ?
                                    <PrivateRoute/> :
                                    <PublicRoute/>
                                }
                            </Contents>
                        </Suspense>
                    </ErrorBoundary>
                </Suspense>
            </BrowserRouter>
        </Suspense>
    )
}





