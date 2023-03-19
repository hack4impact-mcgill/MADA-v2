import React from 'react';
import Header from './Components/Header/Header';
import RouterComponent from './Router';

// Create a functional component
export default function App() {
	return (
		<div>
			<Header/>
			<RouterComponent/>
		</div>
	);
}
