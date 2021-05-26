import React from 'react';

import CommentItem from './CommentItem';

const CommentList = ({comments, handleDelete, handleEdit}) => {
    if (!comments) {
        return <div>LOADING</div>
    }
    
    return (
        <>
            {comments && (comments).map((comment) => <CommentItem key={comment.id} comment={comment} handleDelete={handleDelete} handleEdit={handleEdit}/>)}
        </>
    )
}

export default CommentList;