import { connect } from 'react-redux';
import {PostsView as PostsViewComponent} from '../components/PostsView';
import * as Actions from '../actions/reddit';

function getVisiblePosts(posts, query) {
    const keywords = query.toLowerCase().split(" ");
    return posts.filter(
        p => !keywords.some(k => p.data.title.toLowerCase().indexOf(k) < 0)
    ).sort(
        (a, b) => b.data.created_utc - a.data.created_utc
    );
}

const mapStateToProps = (state) => {
    return {
        query: state.reddit.query,
        posts: getVisiblePosts(state.reddit.posts, state.reddit.query)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onQueryChange: (q) => {
            dispatch(Actions.setQuery(q));
        },
        onLoadNewPosts: () => {
            dispatch(Actions.loadNewPosts())
        },
        onLoadInitialPosts: () => {
            dispatch(Actions.loadInitialPosts())
        }
    }
};

export const PostsView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsViewComponent);
