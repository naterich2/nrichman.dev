import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import React from 'react'
import { withRouter } from "react-router"

class MainNav_raw extends React.Component {
//	const handleDropdownSelect = eventKey => {
//
//	};
	render(){
		return (
			<>
				<Navbar bg="dark" variant="dark">
					<Nav className="main-nav">
						<Nav.Link onSelect={() => this.props.history.push("/")}>Home</Nav.Link>
						<Nav.Link onSelect={() => this.props.history.push("/blog")}>Blog</Nav.Link>
						<Nav.Link onSelect={() => this.props.history.push("/resume")}>Resume</Nav.Link>
						<Nav.Link onSelect={() => window.location.href="https://git.nrichman.dev"}>Git Repo</Nav.Link>
						<NavDropdown title="Intranet" id="intranet-dropdown">
							<NavDropdown.Item onSelect={() => window.location.href="http://192.168.90.34/admin"}>Pi-Hole Admin</NavDropdown.Item>
							<NavDropdown.Item eventKey="2">Grafana</NavDropdown.Item>
							<NavDropdown.Item eventKey="3">Transmission</NavDropdown.Item>
							<NavDropdown.Item eventKey="4"Deezloader></NavDropdown.Item>
							<NavDropdown.Item eventKey="5">Soulseek</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			</>
		)
	}
}
const MainNav = withRouter(MainNav_raw);

export default MainNav
