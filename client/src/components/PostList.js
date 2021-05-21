import React from 'react';
import PostItem from '../components/PostItem';

const PostList = ({posts}) => {
    return (
        <>
            {posts.length > 0 ?
                 posts && posts.map((post) => <PostItem post={post} key={post.id}/>) : 
                 <div>EMPTY</div>}
        </>
    )
}

export default PostList;