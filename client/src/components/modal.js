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
                    <div className="button secondary" onClick={onClose}>취소</div>
                    <div className="button primary" onClick={onSuccess}>확인</div>
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
                    <div className="button primary" onClick={onClose}>확인</div>
                </div>
            </div>
        </>
    )
}






export {useModal, ModalConfirm, ModalAlert};