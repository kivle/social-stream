import React, { Component } from 'react';
import moment from 'moment';
import {
    Card, 
    CardActions, 
    CardHeader, 
    CardMedia, 
    CardTitle, 
    CardText} from 'material-ui/Card';

class PostCard extends Component {
    render() {
        const p = this.props.post;
        const thumbnail = /^https?:/.test(p.data.thumbnail) ? 
            p.data.thumbnail : 
            "http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Reddit-icon.png";

        const url = /^https?:/.test(p.data.url) ? p.data.url : `https://www.reddit.com/${p.data.url}`;

        const ago = moment(p.data.created_utc, "X").fromNow();
        const summary = `${ago} in ${p.data.subreddit}, ${p.data.num_comments} comments`;

        return (
            <Card>
                <CardHeader 
                    title={<a target="_blank" href={url}>{p.data.title}</a>}
                    subtitle={summary} 
                    avatar={thumbnail} />
            </Card>
        );
    }
}

export class PostsCards extends Component {
    render() {
        const posts = (this.props.posts || []).map(p => {
            return (
                <PostCard key={p.data.name} post={p} />
            );
        });

        return (
            <div>
                {posts}
            </div>
        );
    }
}
