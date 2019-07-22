import './Home.css';
import { Carousel, ButtonGroup, Button, Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Blog() {
  return (
    <div className="home">
	    <Live />
	    <div style={{position:'absolute', backgroundAttachment: 'scroll', top:'70%', width:'100%', backgroundColor: '#282c35'}}>
	      <MainNav />
        <Carousel>
          {/* Put have 5 most recent blog posts circulating in carousel */}
        </Carousel>
        <ButtonGroup>
          {/* Have a button for all the tags */}
        </ButtonGroup>
        <Footer />
	    </div>
    </div>
  );
}

export default Blog;
