import React from 'react';
import PostItem from '../components/PostItem';

const PostList = ({posts, history}) => {
    return (
        <>
            {posts.length > 0 ?
                 posts && posts.map((post) => <PostItem post={post} key={post.id} history={history}/>) : 
                 <div>EMPTY</div>}
        </>
    )
}

export default PostList;