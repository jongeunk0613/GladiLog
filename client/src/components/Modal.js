import React from 'react';
import styled from 'styled-components';

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

const Modal = ({contentTitle, contentBody, onClick }) => {
    return (
        <div className="modal is-active" onClick={onClick}>
            <div className="modal-background" />
            <div className="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{contentTitle}</p>
                </header>
                <section class="modal-card-body">
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