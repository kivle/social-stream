import { reddit } from './reddit';
import expect from 'expect';
import * as ActionTypes from '../consts/actionTypes';
import { redditPosts } from './fixtures/redditPosts';
import { postComments, postComments2 } from './fixtures/redditPostComments';

describe('reddit reducer', () => {
    it('sets initial state', () => {
        const result = reddit();
        expect(result).toExist();
        expect(result.posts).toExist();
        expect(result.posts.length).toBe(0);
    });

    it('adds new stories', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.ADD_POSTS,
            payload: redditPosts
        };
        const result = reddit(initial, action);
        expect(result.posts.length).toBe(100);
        expect(result.after).toBe("t3_65ir6r");
        expect(result.before).toBe(null);
    });

    it('does not double add stories', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.ADD_POSTS,
            payload: redditPosts
        };
        const added = reddit(initial, action);
        const result = reddit(added, action);
        expect(result.posts.length).toBe(100);
        expect(result.after).toBe("t3_65ir6r");
        expect(result.before).toBe(null);
    });

    it('sets query', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SET_QUERY,
            query: "Hello"
        };
        const result = reddit(initial, action);
        expect(result.query).toBe("Hello");
    });

    it('saves story', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6r"
        };
        const result = reddit(initial, action);
        expect(result.savedPosts.length).toBe(1);
        expect(result.savedPosts[0]).toBe("t3_65ir6r");
    });

    it('does not save story twice', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6r"
        };
        const added = reddit(initial, action);
        const result = reddit(added, action);
        expect(result.savedPosts.length).toBe(1);
        expect(result.savedPosts[0]).toBe("t3_65ir6r");
    });

    it('unsaves story', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6r"
        };
        const added = reddit(initial, action);
        const action2 = {
            type: ActionTypes.UNSAVE_POST,
            post: "t3_65ir6r"
        };
        const result = reddit(added, action2);
        expect(result.savedPosts.length).toBe(0);
    });

    it('adds comments to posts', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6u"
        };
        const added = reddit(initial, action);
        const action2 = {
            type: ActionTypes.ADD_POST_COMMENTS,
            post: "t3_65ir6u",
            payload: postComments
        };
        const result = reddit(added, action2);
        expect(result.postComments["t3_65ir6u"]).toExist();
        expect(result.postComments["t3_65ir6u"].length).toBe(3);
    });

    it('it does not add comments twice', () => {
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6u"
        };
        const added = reddit(initial, action);
        const action2 = {
            type: ActionTypes.ADD_POST_COMMENTS,
            post: "t3_65ir6u",
            payload: postComments
        };
        const added2 = reddit(added, action2);
        const result = reddit(added2, action2);
        expect(result.postComments["t3_65ir6u"]).toExist();
        expect(result.postComments["t3_65ir6u"].length).toBe(3);
    });

    it('appends new comments and updates existing', () => {
        const updatedCommentName = 't1_dgal4bn';
        const insertedCommentName = 't1_dgakraf';
        const initial = reddit();
        const action = {
            type: ActionTypes.SAVE_POST,
            post: "t3_65ir6u"
        };
        const added = reddit(initial, action);
        const action2 = {
            type: ActionTypes.ADD_POST_COMMENTS,
            post: "t3_65ir6u",
            payload: postComments
        };
        const added2 = reddit(added, action2);
        const action3 = {
            type: ActionTypes.ADD_POST_COMMENTS,
            post: "t3_65ir6u",
            payload: postComments2
        }
        const result = reddit(added2, action3);
        expect(result.postComments["t3_65ir6u"]).toExist();
        expect(result.postComments["t3_65ir6u"].length).toBe(4);
        const comment = result.postComments["t3_65ir6u"].filter(c => c.data.name === updatedCommentName)[0];
        expect(comment.data.body).toBe("Updated comment body");
        const comment2 = result.postComments["t3_65ir6u"].filter(c => c.data.name === insertedCommentName)[0];
        expect(comment2.data.body).toBe("New comment");
    });
});
