import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import {PostsCards} from './PostsCards';
//import {PostsTable} from './PostsTable';

export class PostsView extends Component {

    constructor(props) {
        super(props);
        this.props.onLoadInitialPosts();
        this.interval = setInterval(this.props.onLoadNewPosts, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleQueryChange = (e) => {
        if (this.props.onQueryChange)
            this.props.onQueryChange(e.target.value);
    }

    render() {
        return (
            <div>
                <TextField 
                    onChange={this.handleQueryChange }
                    value={this.props.query}
                    fullWidth={true} 
                    hintText="Type to search" 
                    floatingLabelText="Search for posts" />
                <PostsCards 
                    posts={this.props.posts} />
            </div>
        );
    }
}
