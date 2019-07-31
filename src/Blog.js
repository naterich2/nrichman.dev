import './Home.css'
import { Carousel, ButtonGroup, Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import BlogForm from './BlogForm.js'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blogs: null,
      isLoading: true,
      showModal: false,
      loggedIn: false,
      tags: [],
      tagDetail: false,
      tag: -1,
      tagBlogs: []

    }
  }

  componentDidMount() {
    fetch('/resources/blog/recent') // eslint-disable-line no-undef
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        this.setState({ blogs: data, isLoading: false })
      })
    fetch('/resources/verifyToken') // eslint-disable-line no-undef
      .then((resp) => {
        if(resp.status === 200) this.setState({loggedIn: true});
      })
    fetch('/resources/blog/tags')
      .then((resp) => resp.json())
      .then((myJson) => {this.setState({
        tags: myJson.map((obj) => [obj.ID, obj.tagName])
      })})
  }

  componentDidUpdate(){
    if(this.state.tagDetail && this.state.tag !== -1){
      fetch('/resources/blog/tag/'+this.state.tag)
        .then(resp => resp.json())
        .then(myJSON => {this.setState({tagBlogs: myJSON})})
    }
  }

  render () {
    if (this.state.isLoading) return (<></>)
    else {
      const items = []
      const buttons = this.state.tags.map((obj) => (
        <Button
          variant='dark'
          onClick={() => this.setState({tagDetail: true, tag: obj[0]})}
        >{obj[1]}</Button>
      ))
      for (const [index, value] of this.state.blogs.entries()) { // eslint-disable-line no-unused-vars
        items.push(
          <Carousel.Item as={Container} style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/blog/' + value.ID)}>
            <Container style={{ marginBottom: '10%' }}>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <h3 style={{ color: 'rgb(70,70,70)' }}>{value.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <p style={{ color: 'rgb(70,70,70)' }}>{value.synopsis}</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <p style={{ color: 'rgb(70,70,70)' }}>By: {value.author}</p>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        )
      }
      const onClose = () => {
        this.setState({ blogs: this.state.blogs, isLoading: this.state.isLoading, showModal: false })
      }
      return (
        <div className='home'>
          <Live />
          <BlogForm close={onClose.bind(this)} show={this.state.showModal} />
          <div style={{ position: 'absolute', backgroundAttachment: 'scroll', top: '70%', width: '100%', backgroundColor: '#282c35' }}>
            <MainNav />
            <Jumbotron style={{ left: '15%', width: '70%', position: 'relative' }}>
              <Container>
                {this.state.loggedIn && <Row><Col md={2}><Button variant='primary' onClick={() => this.setState({ blogs: this.state.blogs, isLoading: this.state.isLoading, showModal: true })}>Add Blog</Button></Col></Row>}
                <Row>
                  <Col md={{ span: 10, offset: 1 }}>
                    <Carousel>
                      {items}
                    </Carousel>
                  </Col>
                </Row>
              </Container>
              <ButtonGroup>
                {buttons}
              </ButtonGroup>
            </Jumbotron>
            <Footer />
          </div>
        </div>
      )
    }
  }
}
export default Blog
