import React from 'react';

import CommentItem from './CommentItem';

const CommentList = ({comments, handleDelete}) => {
    if (!comments) {
        return <div>LOADING</div>
    }
    
    return (
        <>
            {comments && ([].concat(comments).reverse()).map((comment) => <CommentItem key={comment.id} comment={comment} handleDelete={handleDelete}/>)}
        </>
    )
}

export default CommentList;