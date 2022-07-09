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



export {Loading, Error, Notfound}
