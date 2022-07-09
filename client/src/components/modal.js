import {useState} from "react";

const useModal = () => {
    const [toggleModal, setToggleModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({});
    const triggerModal = () => setToggleModal(!toggleModal);

    return [toggleModal, triggerModal, modalMessage, setModalMessage];
}

function ModalConfirm({action, children, closed}) {
    /*
    * action : func
    * children = { title : String , desc : String }
    * closed : triggerModal
    * */
    const onSuccess = () => {
        action();
        closed();
    }
    const onClose = () => {
        closed();
    }
    return (
        <>
            <div className="dimmed"></div>
            <div className="modal-popup">
                <div className="cont">
                    <div>
                        {children.title &&
                            <h1>{children.title}</h1>
                        }
                        {children.desc &&
                            <p>{children.desc}</p>
                        }
                    </div>
                </div>
                <div className="buttons">
                    <button className="button secondary" onClick={onClose} type="button">취소</button>
                    <button className="button primary" onClick={onSuccess} type="button">확인</button>
                </div>
            </div>
        </>
    )
}

function ModalAlert({children, closed}){
    const onClose = () => {
        closed();
    }
    return (
        <>
            <div className="dimmed"></div>
            <div className="modal-popup">
                <div className="cont">
                    <div>
                        {children.title &&
                            <h1>{children.title}</h1>
                        }
                        {children.desc &&
                            <p>{children.desc}</p>
                        }
                    </div>
                </div>
                <div className="buttons">
                    <button className="button primary" onClick={onClose} type="button">확인</button>
                </div>
            </div>
        </>
    )
}






export {useModal, ModalConfirm, ModalAlert};