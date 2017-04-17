import React from 'react';
import '../styles/App.css';

import {PostsTable} from '../components/PostsTable';

const App = ({ children }) => (
    <div className="App">
        <div className="App-left">
            <PostsTable />
        </div>
        <div className="App-right">
            <PostsTable />
        </div>
    </div>
);

export default App;
