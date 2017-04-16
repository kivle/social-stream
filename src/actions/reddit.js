import * as ActionTypes from '../consts/actionTypes';

const ALL_NEW_URL = 'https://www.reddit.com/r/all/new.json';

export function loadNewPosts() {
    return (dispatch) => {
        const res = await fetch(ALL_NEW_URL);
        const data = await res.json();
        const action = {
            type: ActionTypes.ADD_POSTS,
            payload: data
        };
        dispatch(action);
    };
}

export function savePost(post) {
    return {
        type: ActionTypes.SAVE_POST,
        post: post
    };
}

export function unsavePost(post) {
    return {
        type: ActionTypes.UNSAVE_POST,
        post: post
    };
}

export function addPostComments() {
    return (dispatch, getState) => {
        const state = getState();
        for (let i = 0; i < state.reddit.savedPosts.length; i++) {
            const post = state.reddit.savedPosts[i];
            const postObj = state.reddit.posts.filter(p => p.data.name === post)[0];
            const postUrl = `https://www.reddit.com${postObj.data.permalink}comments.json?sort=new`;
            const res = await fetch(postUrl);
            const data = await res.json();
            const action = {
                type: ActionTypes.ADD_POST_COMMENTS,
                post: post,
                payload: data
            };
            dispatch(action);
        }
    };
}