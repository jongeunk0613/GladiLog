import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    height: 40vh;
    border-radius: 1rem;
    font-size: 1.5rem;
    white-space: pre-wrap;
`;

const Modal = ({contentTitle, contentBody, url}) => {
    const history = useHistory();
    
    const onClick = () => {
        if (url) {
            history.push(url);
        }
        else {
            history.goBack();
        }
    }
    
    return (
        <div className="modal is-active" onClick={onClick}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{contentTitle}</p>
                </header>
                <section className="modal-card-body">
                    <ModalContent>
                        {contentBody}
                    </ModalContent>
                </section>
            </div>
            <button className="modal-close is-large" aria-label="close" />
        </div>
    );
}

export default Modal;