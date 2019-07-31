import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import React from 'react'
import { withRouter } from 'react-router'
import Login from './Login.js'

class MainNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      loggedIn: false,
      user: ''
    }
  }

  componentDidMount () {
    fetch('/resources/verifyToken') // eslint-disable-line no-undef
      .then(resp => {
        if (resp.status === 200) {
          return resp.json()
        }
      })
      .then(myjson => {
        if (myjson) {
          this.setState({
            showModal: this.state.showModal,
            loggedIn: true,
            user: myjson.username
          })
        }
      })
  }

  render () {
    const close = () => this.setState({ showModal: false, loggedIn: true })
    return (
      <>
        <Navbar bg='dark' variant='dark'>
          <Nav className='main-nav' >
            <Nav.Link eventKey='home' onSelect={(evtKey, evt) => this.props.history.push('/')}>Home</Nav.Link>
            <Nav.Link eventKey='blog' onSelect={(evtKey, evt) => this.props.history.push('/blog')}>Blog</Nav.Link>
            <Nav.Link eventKey='resume' onSelect={(evtKey, evt) => this.props.history.push('/resume')}>Resume</Nav.Link>
            <Nav.Link eventKey='git' onSelect={(evtKey, evt) => window.location.href = 'https://git.nrichman.dev'}>Git Repository</Nav.Link>{/* eslint-disable-line no-return-assign */}
            { this.state.loggedIn &&
            <NavDropdown title='Intranet' id='intranet-dropdown'>
              <NavDropdown.Item eventKey='pihole' onSelect={(evtKey, evt) => window.location.href = 'http://192.168.0.34/admin'}>Pi-Hole Admin</NavDropdown.Item> {/* eslint-disable-line no-return-assign */}
              <NavDropdown.Item eventKey='grafana' onSelect={(evtKey, evt) => window.location.href = 'http://192.168.0.197:3000'}>Grafana</NavDropdown.Item>{/* eslint-disable-line no-return-assign */}
              <NavDropdown.Item eventKey='transmission' onSelect={(evtKey, evt) => window.location.href = 'http://192.168.0.197:9000'}>Transmission</NavDropdown.Item>{/* eslint-disable-line no-return-assign */}
              <NavDropdown.Item eventKey='deezloader' onSelect={(evtKey, evt) => window.location.href = 'http://192.168.0.197:1730'}>Deezloader</NavDropdown.Item>{/* eslint-disable-line no-return-assign */}
              <NavDropdown.Item eventKey='soulseek' onSelect={(evtKey, evt) => window.location.href = 'http://192.168.0.197:6080'}>Soulseek</NavDropdown.Item>{/* eslint-disable-line no-return-assign */}
            </NavDropdown>
            }
            { !this.state.loggedIn && <Button variant='link' style={{ position: 'absolute', right: '5%' }} onClick={() => this.setState({ showModal: true })}>Login</Button> }
            { this.state.loggedIn && <Button variant='link' style={{ position: 'absolute', right: '5%' }}>{this.state.user}</Button> }
          </Nav>
        </Navbar>
        <Login show={this.state.showModal} onClose={close.bind(this)} />
      </>
    )
  }
}

export default withRouter(MainNav)
