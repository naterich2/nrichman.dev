import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

library.add(fab);
const social = [['linkedin','https://www.linkedin.com/in/nathan-richman-b95453124/'], ['github', 'https://github.com/nrichman2'],['git-square', 'https://git.nrichman.dev/nrichman']]
const logos = social.map(([icon, link]) => {
  return (
    <a href={link} style={{flexGrow: '1'}}><FontAwesomeIcon style={{
      verticalAlign: 'middle',
        padingLeft:'2px',
        paddingRight:'2px',
        marginLeft:'2px',
        marginRight:'2px',
        color: 'rgb(100,100,100)',
    }} icon={['fab',icon]} size='2x' /></a>
  )
})
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
          <Col md={{span:6, offset:3}} style={{align: 'center',display:'flex'}}>
            {logos}
          </Col>
        </Row>
        <Row>
          <Col md={{span:8, offset:2}}>
            <p style={{textAlign:'center'}}>Made by Nate Richman using React, Bootstrap, Express, and MariaDB</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
