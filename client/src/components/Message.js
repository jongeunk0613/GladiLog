import React from 'react';
import styled from 'styled-components';

const MessagePosition = styled.div`
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    display: flex;
    justify-content: center;
`;

const MessageContainer = styled.div`
    width: 40%;
    margin: 1.5rem;
`;

const Message = ({content, type, show}) => {
    return (
        <MessagePosition show={show}>
            <MessageContainer>
                <article className={`message ${type}`}>
                    <div className="message-body">
                        {content}
                    </div>
                </article>
            </MessageContainer>
        </MessagePosition>
    )
}

export default Message;

