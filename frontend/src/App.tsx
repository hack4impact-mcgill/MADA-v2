import React from 'react';
import User from './User';
import Availibilities from './Availibilities';
import Account from './Account';
import Contact from './Contact';
import Footer from './Footer';

// Create a functional component
export default function App() {
	return (
		<div>
			<User/>
            <Availibilities/>
            <Account/>
            <Contact/>
            <Footer/>
		</div>
	);
}
