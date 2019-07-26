import './Home.css';
import { Modal, Alert, Form, Button } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

class Login extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      error: ''
    }
  }
  render(){
    return (
      <Modal show={this.props.show}>
        {this.state.loading && <Alert variant="success">Loading</Alert>}
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" id="email-field" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" id="password-field" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => {
            console.log(JSON.stringify({username: document.getElementById('email-field').value,password: document.getElementById('password-field').value}));
            this.setState({show: this.state.show, loading: true, error: ''})
            fetch('/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: document.getElementById('email-field').value,
                password: document.getElementById('password-field').value
              })
            }).then((resp) => {
              if(resp.status == 500) this.props.onClose();
              return resp.json()
            }).then((data) => console.log(data));
          }}>Login</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login;
