import * as ActionTypes from '../consts/actionTypes';

export function setQuery(q) {
    return {
        type: ActionTypes.SET_QUERY,
        query: q
    };
}

export function loadNewPosts() {
    return async (dispatch, getState) => {
        const state = getState();
        const data = await getPosts(state.reddit.subreddits, "new.json", 10);
        const action = {
            type: ActionTypes.ADD_POSTS,
            payload: data
        };
        dispatch(action);
    };
}

export function loadInitialPosts() {
    return async (dispatch, getState) => {
        const state = getState();
        const promises = [getPosts(state.reddit.subreddits, "new.json", 100),
                          getPosts(state.reddit.subreddits, "rising.json", 100),
                          getPosts(state.reddit.subreddits, ".json", 100)];
        for (let result of promises) {
            const action = {
                type: ActionTypes.ADD_POSTS,
                payload: await result
            };
            dispatch(action);
        }
    }
}

async function getPosts(reddits, source, num) {
    let url = `https://www.reddit.com/r/${reddits}/${source}?sort=new&limit=${num}`;
    const res = await fetch(url);
    return await res.json();
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
