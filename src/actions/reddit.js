import * as ActionTypes from '../consts/actionTypes';

const ALL_NEW_URL = 'https://www.reddit.com/r/all/new.json?sort=new&limit=100';

export function setQuery(q) {
    return {
        type: ActionTypes.SET_QUERY,
        query: q
    };
}

export function loadNewPosts() {
    return async (dispatch, getState) => {
        const state = getState();
        let url = `https://www.reddit.com/r/${state.reddit.subreddits}/new.json?sort=new&limit=100`;
        if (state.reddit.newest)
            url += `&before=${state.reddit.newest}`;
        const res = await fetch(url);
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

export function refreshPostComments() {
    return async (dispatch, getState) => {
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
