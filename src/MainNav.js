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
				<Navbar bg="dark">
					<Nav className="main-nav">
						<Nav.Link onSelect={() => this.props.history.push("/")}>Home</Nav.Link>
						<Nav.Link onSelect={() => this.props.history.push("/blog")}>Blog</Nav.Link>
						<Nav.Link onSelect={() => this.props.history.push("/git")}>Git Repo</Nav.Link>
						<NavDropdown title="Intranet" id="intranet-dropdown">
							<Nav.Item eventKey="1">Pi-Hole Admin</Nav.Item>
							<Nav.Item eventKey="2">Grafana</Nav.Item>
							<Nav.Item eventKey="3">Transmission</Nav.Item>
							<Nav.Item eventKey="4"Deezloader></Nav.Item>
							<Nav.Item eventKey="5">Soulseek</Nav.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			</>
		)
	}
}
const MainNav = withRouter(MainNav_raw);

export default MainNav
