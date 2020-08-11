import React from 'react';
import './App.scss';

import CustomerApiClient from './components/CustomerApiClient'


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Customer API</h1>
				<p>This React UI allows you to interact with a basic Customer API build in ASP.NET Core, demonstrating the usage of Express Gateway.</p>
			</header>
			<main className="content">
				<CustomerApiClient />
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
