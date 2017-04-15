import * as ActionTypes from '../consts/actionTypes';

const initialState = {
    query: null,
    stories: [],
    storyComments: {},
    saved: [],
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
        case ActionTypes.ADD_STORIES:
            const oldStories = state.stories.filter(
                (s) => action.payload.data.children.filter((s2) => s.data.name === s2.data.name).length <= 0
            );

            return {
                ...state,
                stories: [
                    ...oldStories,
                    ...action.payload.data.children
                ],
                after: action.payload.data.after,
                before: action.payload.data.before
            };
            break;
        case ActionTypes.SET_QUERY:
            return {
                ...state,
                query: action.query
            };
        case ActionTypes.SAVE_STORY:
            if (state.saved.indexOf(action.story) >= 0)
                return state;

            return {
                ...state,
                saved: [
                    ...state.saved,
                    action.story
                ]
            };
        case ActionTypes.UNSAVE_STORY:
            return {
                ...state,
                saved: state.saved.filter((s) => s !== action.story),
                storyComments: removeKey(state.storyComments, action.story)
            };
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state
            };
        default:
            return state;
    }
};
