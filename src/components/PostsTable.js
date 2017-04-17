import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export class PostsTable extends Component {

    render() {
        const posts = (this.props.posts || []).map(p => {
            return (
                <TableRow key={p.data.name}>
                    <TableRowColumn>{p.data.subreddit}</TableRowColumn>
                    <TableRowColumn>{p.data.title}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Subreddit</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {posts}
                </TableBody>
            </Table>
        );
    }
}
