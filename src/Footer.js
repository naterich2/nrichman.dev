import './Home.css';
import { Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Footer() {
  return (
    <div className="footer" style={{backgroundAttachment: 'scroll', bottom:'0', width:'100%', backgroundColor: '#282c35'}}>
      <Container style={{width:'40%'}}>
        <Row>
          <Col md={{span:4, offset:4}}>
            <h5 style={{textAlign:'center'}}>Nate Richman</h5>
          </Col>
        </Row>
        <Row>
          <Col md={{span:8, offset:2}}>
            <p style={{textAlign:'justify'}}>Made by Nate Richman 2019 using React and Bootstrap for front end, Express</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
