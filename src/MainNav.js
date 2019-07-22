import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import React from 'react'
import { withRouter } from "react-router"

class MainNav extends React.Component {
//	const handleDropdownSelect = eventKey => {
//
//	};
	render(){

		return (
			<>
				<Navbar bg="dark" variant="dark">
					<Nav className="main-nav" >
						<Nav.Link eventKey="home" onSelect={(evtKey, evt) => this.props.history.push("/")}>Home</Nav.Link>
						<Nav.Link eventKey="blog" onSelect={(evtKey, evt) => this.props.history.push("/blog")}>Blog</Nav.Link>
						<Nav.Link eventKey="resume" onSelect={(evtKey, evt) => this.props.history.push("/resume")}>Resume</Nav.Link>
						<Nav.Link eventKey="git" onSelect={(evtKey,evt) => window.location.href = "https://git.nrichman.dev"}>Git Repo</Nav.Link>
						<NavDropdown title="Intranet" id="intranet-dropdown">
							<NavDropdown.Item eventKey="pihole" onSelect={(evtKey,evt) => window.location.href = "http://192.168.0.34/admin"}>Pi-Hole Admin</NavDropdown.Item>
							<NavDropdown.Item eventKey="grafana" onSelect={(evtKey,evt) => window.location.href = "http://192.168.0.197:3000"}>Grafana</NavDropdown.Item>
							<NavDropdown.Item eventKey="transmission" onSelect={(evtKey,evt) => window.location.href = "http://192.168.0.197:9000"}>Transmission</NavDropdown.Item>
							<NavDropdown.Item eventKey="deezloader" onSelect={(evtKey,evt) => window.location.href = "http://192.168.0.197:1730"}>Deezloader</NavDropdown.Item>
							<NavDropdown.Item eventKey="soulseek" onSelect={(evtKey,evt) => window.location.href = "http://192.168.0.197:6080"}>Soulseek</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			</>
		)
	}
}

export default withRouter(MainNav);
