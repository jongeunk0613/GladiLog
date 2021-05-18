import React from 'react';
import Post from '../components/Post';

const PostList = ({posts}) => {
    return (
        <>
            {posts && posts.map((post) => <Post post={post} key={post.id} />)}
            {!posts && 
                <div>EMPTY</div>
            }
        </>
    )
}

export default PostList;