import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home.js'

function Main() {
  return (
		<>
			<Router>
				<Route path="/" exact component={Home} />
	  			<Route path="/git" exact component={() => {
					window.location.href = "https://git.nrichman.dev";
					return null;
				}}/>
			</Router>
		</>
  );
}

export default Main;
