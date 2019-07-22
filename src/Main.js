import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home.js'
import Resume from './Resume.js'

function Main() {
  return (
		<>
			<Router>
				<Route path="/" exact component={Home} />
        <Route path="/resume" component={Resume} />
			</Router>
		</>
  );
}

export default Main;
