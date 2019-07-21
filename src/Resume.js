import './Home.css';
import { Jumbotron,Container,Row,Col,Image } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Resume() {
  return (
    <div className="home">
	    <div style={{position:'fixed', backgroundAttachment: 'scroll', top:'50%', width:'100%', backgroundColor: 'rgb(100,100,100)'}}>
	      <MainNav />
        <Jumbotron style={{backgroundAttachment: 'scroll', position: 'fixed', left: '15%', width:'70%'}}>
          <Container style={{width:'80%'}}>
            <Row>
              <Col md={{span: 2, offset=5}}>
                <h3>Nate Richman</h3>
                <a href="mailto:nate@nrichman.dev">Contact</a>
              </Col>
            </Row>
            <Row>
              <Col md={{span: 2}}>
                <h4><b>Objective</b></h4>
              </Col>
            </Row>
            <Row>
              <Col md={{span: 12}}>
                <p>I am an undergraduate student looking to contribute to biomedical research and development in a technical setting. I
    am fascinated by many areas of biomedical engineering including electronics, mechanics, biochemistry, and computer
    science/informatics. In order to learn more in these fields I work as a network engineer in the Division of IT at UW-
    Madison and take computer science classes for a minor, I worked in a mechanical engineering lab, and I major in
    Biomedical Engineering. I love to learn, and challenging problems inspire my curiosity, because of this I am a quick
    learner, and I have demonstrated my ability to work in a fast paced environment.</p>
              </Col>
            </Row>
            <Row>
              <Col md={{span: 2}}>
                <h4><b>Education</b></h4>
              </Col>
            </Row>
            <Row>
              <Col md={{span: 8}}>
                <p><b>Bachelor of Biomedical Engineering, emphasis in Biomaterials, Cellular/Tissue Engineering</b></p>
                <p>Certificates in Biocore Honors, Computer Science, and Biology in Engineering</p>
                <p><i>Univeresity of Wisconsin-Madison</i>, Madison, WI</p>
                <p>&nbsp&nbsp&nbsp&nbsp Graduated with Highest Distinction</p>
              </Col>
              <Col md={{span:2, offset:10}}>
                <p>May 2019</p>
              </Col>
            </Row>
            <Row>
              <Col md={{span: 8}}>
                <p><b>Master of Biomedical Engineering</b></p>
                <p><i>Univeresity of Wisconsin-Madison</i>, Madison, WI</p>
              </Col>
              <Col md={{span:2, offset:10}}>
                <p>May 2020</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
	    </div>
    </div>
  );
}

export default Home;
