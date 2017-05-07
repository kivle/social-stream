import React from 'react';
import '../styles/App.css';
import Paper from 'material-ui/Paper';

import {PostsTable} from '../components/PostsTable';
import {PostsView} from '../containers/PostsView';

const paperStyle = {
  margin: 5,
  padding: 10
};

const App = ({ children }) => (
    <div className="App">
        <div className="App-left">
            <Paper style={paperStyle}>
                <PostsView />
            </Paper>
        </div>
        <div className="App-right">
            <Paper style={paperStyle}>
                <PostsTable />
            </Paper>
        </div>
    </div>
);

export default App;
