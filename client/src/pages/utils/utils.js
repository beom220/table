function Loading() {
    return (
        <div className="loading">
            <div className="loading-bar">
                <ul className="animate">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

function Error() {
    return <div>Error...</div>
}

function Notfound() {
    return <p>404 Error</p>
}

function ModalConfirm({props, children, closed}){
    console.log(typeof children)
    const onSuccess = () => {
        props();
        closed();
    }
    const onFalse = () => {
        closed();
    }
    return (
        <>
            <div className="dimmed"></div>
            <div className="modal-popup">
                <div className="cont">
                    {typeof children === "object" ?
                        <div><h1>{children.title}</h1><p>{children.desc}</p></div> :
                        <div>{children}</div>
                    }
                </div>
                <div className="buttons">
                    <div className="button secondary" onClick={onFalse}>취소</div>
                    <div className="button primary" onClick={onSuccess}>확인</div>
                </div>
            </div>
        </>
    )
}

export {Loading, Error, Notfound, ModalConfirm}
