import './Home.css';
import { Jumbotron,Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Home() {
  return (
    <div className="home">
	    <Live />
	    <div style={{position:'relative', backgroundAttachment: 'scroll', top:'50%', width:'100%', backgroundColor: '#282c35'}}>
	      <MainNav />
        <Jumbotron style={{backgroundAttachment: 'scroll', position: 'relative', left: '15%', width:'70%'}}>
          <Container style={{width:'40%'}}>
            <Row>
              <h3>About Me</h3>
              <p>Hey I'm Nate!  I'm a Masters student UW-Madison in Biomedical Engineering.  I did my undergrad in Biomedical Engineering and minored in Comp. Sci., Biology in Engineering, and Honors, research-based biology.</p>
              <p>I love to learn and discover new things so I work on a lot of projects outside of work or school.  Most recently I'm really interested in computer networking from my time as a network engineer at the Department of Information Technology (DoIT) on campus.  Over the past few years I've been accumulating hardware and implementing software to make my own networking lab with which to experiment, including building this website!</p>
              <p>Outside of school and nerdy computer things, I love to play, <a href="https://www.last.fm/user/naterich2">listen to</a>, and <a href="https://rateyourmusic.com/~naterich2">rate</a> music.  I love to bike, rock climb, camp, canoe, hike, kayak, and many other outdoors things.</p>
            </Row>
          </Container>
        </Jumbotron>
	    </div>
    </div>
  );
}

export default Home;
