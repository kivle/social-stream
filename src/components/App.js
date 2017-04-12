import React from 'react'
import Navigation from './Navigation'

const App = ({ children }) => (
	<div className="App">
		<div className="App-header">
			<h2>Create React Redux App</h2>
			<h6>- Yingray Lu -</h6>
			<p>
				<i className="material-icons">account_balance</i>
				Github:&nbsp;
				<a href="https://github.com/yingray/create-react-redux-app">https://github.com/yingray/create-react-redux-app</a>
			</p>
			<Navigation />
		</div>
		<br/>
		<br/>
		<div>
			{children}
		</div>
		<br/>
		<br/>
	</div>
)

export default App
