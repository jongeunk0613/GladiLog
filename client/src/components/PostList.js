import React from 'react';
import Post from '../components/Post';

const PostList = ({posts}) => {
    return (
        <>
            {posts.length > 0 ?
                 posts && posts.map((post) => <Post post={post} key={post.id} />) : 
                 <div>EMPTY</div>}
        </>
    )
}

export default PostList;