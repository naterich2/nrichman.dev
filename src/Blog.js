import './Home.css';
import { Carousel, ButtonGroup, Button, Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

class Blog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      isLoading: true
    }
  }
  componentDidMount(){
    fetch('/resources/blog/recent')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.setState({blogs: data, isLoading: false});
      });
  }

  render(){
    if(this.state.isLoading) return (<></>)
    else {
      const items = [];
      for (const [index,value] of this.state.blogs.entries()){
        items.push(
          <Carousel.Item>
            <Container>
              <Row>
                <Col md={{span:4, offset:4}}>
                  <h3 style={{color:"rgb(220,220,220)"}}>{value.title}</h3>
                </Col>
              </Row>
            </Container>
            <Carousel.Caption>
              <Container>
                <Row>
                  <Col md={{span:4, offset:4}}>
                    <p>{value.synopsis}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span:4, offset:4}}>
                    <p>By: {value.author}</p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }
      return (
        <div className="home">
          <Live />
          <div style={{position:'absolute', backgroundAttachment: 'scroll', top:'70%', width:'100%', backgroundColor: '#282c35'}}>
            <MainNav />
            <Carousel>
              {items}
            </Carousel>
            <ButtonGroup>
              {/* Have a button for all the tags */}
            </ButtonGroup>
            <Footer />
          </div>
        </div>
      );
    }
  }
}
export default Blog;
