import React from 'react';

const App = ({ children }) => (
	<div className="App">
		<div className="App-header">
			<h2>Reddit Stream</h2>
		</div>
		<div className="App-content">
			{children}
		</div>
	</div>
);

export default App;
