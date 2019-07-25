import './Home.css';
import { Modal, Form, Button, Container, Row, Col} from 'react-bootstrap';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import ReactMarkdown from 'react-markdown';

class BlogForm extends React.Component {
 // const my_id = this.props.match.params.id;
  constructor(props){
    super(props);
    this.state = {
      fulltext: ''
    };
  }

  render(){
    const handleSubmit = () => {
      document.getElementById('title').text;
    }
    return (
      <>
        <Modal size='xl' show={this.props.show}>
          <Modal.Header>
            {this.props.newBlog && <Modal.Title>Upload New Blog</Modal.Title>}
            {! this.props.newBlog && <Modal.Title>Add Comment</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form>
                <Row>
                  <Col md={{span:8, offset: 2}}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control placeholder="Blog" id="blog-title" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span:8, offset: 2}}>
                    <Form.Group controlId="synopsis">
                      <Form.Label>Summary</Form.Label>
                      <Form.Control as="textarea" rows="3" id="blog-synopsis" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span:8, offset: 2}}>
                    <Form.Group controlId="beginning">
                      <Form.Label>Preview</Form.Label>
                      <Form.Control as="textarea" rows="3" id="blog-beginning" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span:8, offset: 2}}>
                    <Form.Group controlId="tags">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control as="textarea" rows="2" id="blog-tags" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={{span:8, offset: 2}}>
                    <Form.Group controlId="fulltext">
                      <Form.Label>Content</Form.Label>
                      <Form.Control as="textarea" value={this.state.fulltext} rows="6" id="blog-fulltext" onChange={() => this.setState({open: this.state.open, fulltext: document.getElementById('blog-fulltext').value})} />
                    </Form.Group>
                  </Col>
                </Row>

              </Form>
              <Row>
                <Col md={12}>
                  <ReactMarkdown source={this.state.fulltext} />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.close()}>Close</Button>
            <Button variant="primary" onClick={handleSubmit.bind(this)}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BlogForm;

