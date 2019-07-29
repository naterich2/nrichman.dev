import './Home.css';
import { Carousel, ButtonGroup, Button, Container,Row,Col } from 'react-bootstrap';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import BlogForm from './BlogForm.js';

class Blog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      isLoading: true,
      showModal: false
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
          <Carousel.Item as={Container} style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/blog/'+value.ID)}>
            <Container style={{marginBottom: '10%'}}>
              <Row>
                <Col md={{span:4, offset:4}}>
                  <h3 style={{color:"rgb(220,220,220)"}}>{value.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col md={{span:4, offset:4}}>
                  <p style={{color:"rgb(220,220,220)"}}>{value.synopsis}</p>
                </Col>
              </Row>
              <Row>
                <Col md={{span:4, offset:4}}>
                  <p style={{color:"rgb(220,220,220)"}}>By: {value.author}</p>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        )
      }
      const onClose = () => {
        this.setState({blogs: this.state.blogs,isLoading:this.state.isLoading, showModal: false})
      }
      return (
        <div className="home">
          <Live />
          <BlogForm close={onClose.bind(this)} show={this.state.showModal}/>
          <div style={{position:'absolute', backgroundAttachment: 'scroll', top:'70%', width:'100%', backgroundColor: '#282c35'}}>
            <MainNav />
            <Button variant="primary" onClick={() => this.setState({blogs: this.state.blogs,isLoading:this.state.isLoading, showModal: true})}>Add Blog</Button>
            <Container>
              <Row>
                <Col md={{span:10,offset:1}}>
                  <Carousel>
                    {items}
                  </Carousel>
                </Col>
              </Row>
            </Container>
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
