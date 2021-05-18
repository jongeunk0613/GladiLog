import React from 'react';
import Post from '../components/Post';

const PostList = ({posts, history}) => {
    return (
        <>
            {posts.length > 0 ?
                 posts && posts.map((post) => <Post post={post} key={post.id} history={history}/>) : 
                 <div>EMPTY</div>}
        </>
    )
}

export default PostList;