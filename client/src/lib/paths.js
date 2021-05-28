export const apiPaths = {
    signup: {url: '/auth/signup', requestType: 'post'},
    signin: {url: '/auth/signin', requestType: 'post'},
    logout: {url: '/auth/logout', requestType: 'post'},
    writePost: {url: '/post/create', requestType: 'post'},
    getPosts: {url: '/post/', requestType: 'get'},
    getPost: {url: '/post/', requestType: 'get'},
    deletePost: {url: '/post/delete/', requestType: 'delete'},
    editPost: {url: '/post/update/', requestType: 'patch'},
    writeComment: {url: '/comment/create/', requestType: 'post'},
    getComments: {url: '/comment/get?postID=', requestType: 'get'},
    deleteComment: {url: '/comment/delete/', requestType: 'delete'},
    getComment: {url: '/comment/', requestType: 'get'},
    editComment: {url: '/comment/update/', requestType: 'patch'}
}

export const historyPaths = {
    main: '/',
    signin: '/auth/signin',
    postWrite: '/post/write',
    postDetail: '/post/',
    postEdit: '/post/edit/'
}
