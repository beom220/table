import { useRecoilValue} from "recoil";
import {Suspense, lazy} from "react";
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {DebugObserver} from "./components/utils/debug";
import {PrivateRoute, PublicRoute} from "./routes";
import {Error, Loading} from "./pages/utils/utils";
import {Header} from "./components/header";
import {Navigation} from "./components/navigation";
import {userState} from "./recoil/member/authorize";


export default function App() {
    const user = useRecoilValue(userState);
    console.log('userState : ',userState);

    return (
        <>
            <DebugObserver/>
            <BrowserRouter>
                <Suspense fallback={<Error/>}>
                    <Header/>
                    <Navigation/>
                    <ErrorBoundary fallback={<Error/>}>

                        <PublicRoute/>

                    </ErrorBoundary>
                </Suspense>
            </BrowserRouter>
        </>
    )
}
// <Suspense fallback={}/>





