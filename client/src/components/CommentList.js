import React from 'react';

import CommentItem from './CommentItem';

const CommentList = ({comments}) => {
    if (!comments) {
        return <div>LOADING</div>
    }
    
    return (
        <>
            {comments && ([].concat(comments).reverse()).map((comment) => <CommentItem key={comment.id} comment={comment}/>)}
        </>
    )
}

export default CommentList;