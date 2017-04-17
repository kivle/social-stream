import * as ActionTypes from '../consts/actionTypes';

const initialState = {
    subreddits: 'news+worldnews+upliftingnews+truenews+indepthstories+interview+entertainment+newsporn+truereddit+newsoftheweird+open_news+uncensorednews+internationalnews',
    query: '',
    posts: [],
    postComments: {},
    savedPosts: [],
    newest: null,
    after: null,
    before: null
};

function removeKey(obj, keyToRemove) {
    return Object.keys(obj).reduce((result, key) => {
        if (key !== keyToRemove) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

export const reddit = (state = initialState, action) => {
    if (!action)
        return state;

    switch (action.type) {
        case ActionTypes.ADD_POSTS:
            const oldPosts = state.posts.filter(
                s => !action.payload.data.children.some(s2 => s.data.name === s2.data.name)
            );

            const newestPost = action.payload.data.children.reduce((aggr, p) => {
                if (!aggr.post || aggr.created_utc < p.data.created_utc) {
                    return {
                        post: p.data.name,
                        created_utc: p.data.created_utc
                    };
                }
                return aggr;
            }, {})

            return {
                ...state,
                posts: [
                    ...action.payload.data.children,
                    ...oldPosts
                ],
                newest: newestPost.post ? newestPost.post : state.newest,
                after: action.payload.data.after,
                before: action.payload.data.before
            };
        case ActionTypes.SET_QUERY:
            return {
                ...state,
                query: action.query
            };
        case ActionTypes.SAVE_POST:
            if (state.savedPosts.indexOf(action.post) >= 0)
                return state;

            return {
                ...state,
                savedPosts: [
                    ...state.savedPosts,
                    action.post
                ]
            };
        case ActionTypes.UNSAVE_POST:
            return {
                ...state,
                savedPosts: state.savedPosts.filter((s) => s !== action.post),
                postComments: removeKey(state.postComments, action.post)
            };
        case ActionTypes.ADD_POST_COMMENTS:
            const existingComments = state.postComments[action.post] || [];
            const comments = action.payload[1].data.children;

            return {
                ...state,
                postComments: {
                    ...state.postComments,
                    [action.post]: [
                        ...comments,
                        ...existingComments.filter(c => !comments.some(c2 => c.data.name === c2.data.name))
                    ]
                }
            };
        default:
            return state;
    }
};
