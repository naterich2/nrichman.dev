import './Home.css'
import { Modal, Alert, Form, Button } from 'react-bootstrap'
import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      dialog: false
    }
  }

  render () {
    return (
      <Modal show={this.props.show}>
        {this.state.loading && <Alert variant='success'>Loading</Alert>}
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Email' id='email-field' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' id='password-field' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.props.onClose}>Cancel</Button>
          <Button variant='primary' onClick={() => {
            console.log(JSON.stringify({ username: document.getElementById('email-field').value, password: document.getElementById('password-field').value }))
            this.setState({ show: this.state.show, loading: true, error: '' })
            fetch('/login', { // eslint-disable-line no-undef
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: document.getElementById('email-field').value,
                password: document.getElementById('password-field').value
              })
            }).then((resp) => {
              if (resp.status === 200) this.props.onClose()
              return resp.json()
            }).then((data) => console.log(data))
          }}>Login</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

Login.propTypes = {
  show: PropTypes.bool.isRequired
}

export default Login
