import './Home.css'
import { Jumbotron, Container, Row } from 'react-bootstrap'
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }
  render() {
    return (
      <div className='home'>
        <Live />
        <div style={{ position: 'absolute', backgroundAttachment: 'scroll', top: '100%', width: '100%', backgroundColor: '#282c35' }}>
          <MainNav onLogin={() => this.setState({loggedIn: false})}/>
          <Jumbotron style={{ backgroundAttachment: 'scroll', position: 'relative', left: '15%', width: '70%' }}>
            <Container style={{ width: '40%' }}>
              <Row>
                <h3>About Me</h3>
                <p>Hey I'm Nate!  I'm a Masters student in biomedical engineering at UW-Madison.  My undergraduate degree is in biomedical engineering with minors in computer science, biology in engineering, and research-based honors biology (Biocore).</p>
                <p>I love to learn and discover new things so I work on a lot of projects outside of work or school.  Most recently I've been really interested in computer networking from my time as a network engineer at the Department of Information Technology (DoIT) on campus.  Over the past few years I've been accumulating hardware and implementing software to make my own networking lab with which to experiment, including building this website!  Check out my <a href='/blog'>blog</a> to learn more about what I've been up to</p>
                <p>Outside of school and somewhat nerdy computer things, I love to play, <a href='https://www.last.fm/user/naterich2'>listen to</a>, and <a href='https://rateyourmusic.com/~naterich2'>rate</a> music.  I love to bike, rock climb, camp, canoe, hike, kayak, disc golf, and play ultimate frisbee.</p>
              </Row>
            </Container>
          </Jumbotron>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
