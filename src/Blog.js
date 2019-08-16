import './Home.css'
import { Carousel, ListGroup, Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Footer from './Footer.js'
import BlogForm from './BlogForm.js'
import BlogList from './BlogList.js'


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

  componentDidMount () {
    console.log("getting recent blogs")
    fetch('/resources/blog/recent') // eslint-disable-line no-undef
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        this.setState({ blogs: data, isLoading: false })
      })
    console.log("verifying token")
    fetch('/resources/verifyToken') // eslint-disable-line no-undef
      .then((resp) => {
        if (resp.status === 200) this.setState({ loggedIn: true })
      })
    console.log("geting blog tags")
    fetch('/resources/blog/tags') // eslint-disable-line no-undef
      .then((resp) => resp.json())
      .then((myJson) => {
        this.setState({
          tags: myJson.map((obj) => [obj.posts, obj.ID, obj.tagName])
        })
      })
  }

  render () {
    if (this.state.isLoading) return (<></>)
    else {
      const items = []
      const tags = this.state.tags.map((obj) => (
        <ListGroup.Item
          action
          style={{textAlign: 'center'}}
          onClick={() => this.setState({tagDetail: true, tag:obj[1]})}
        >{obj[2]+" ("+obj[0]+")"}</ListGroup.Item>
      ))
      for (const [index, value] of this.state.blogs.entries()) { // eslint-disable-line no-unused-vars
        items.push(
          <Carousel.Item as={Container} style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/blog/' + value.ID)}>
            <Container style={{ marginBottom: '10%' }}>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <h3 style={{ color: 'rgb(70,70,70)', textAlign: 'center' }}>{value.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <p style={{ color: 'rgb(70,70,70)', textAlign: 'center' }}>{value.synopsis}</p>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <p style={{ color: 'rgb(70,70,70)', textAlign: 'center' }}>By: {value.name}</p>
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
                <Row style={{marginBottom: '10px'}}>
                  <Col md={{span: 6,offset:3}}>
                    <h4 style={{textAlign: 'center'}}>View Recent Blogs: </h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 12 }}>
                    <Carousel>
                      {items}
                    </Carousel>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span: 6, offset: 3}}>
                    <h5 style={{textAlign: 'center'}}> Or, browse by blog tag:</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span: 6, offset:3}}>
                    <ListGroup>
                      {tags}
                    </ListGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    {this.state.tag !== -1 && <BlogList tagID={this.state.tag} />}
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
            <Footer />
          </div>
        </div>
      )
    }
  }
}
export default Blog
