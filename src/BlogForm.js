import './Home.css';
import { Modal } from 'react-bootstrap';
import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import ReactMarkdown from 'react-markdown'

class BlogViewer extends React.Component {
 // const my_id = this.props.match.params.id;
  constructor(props){
    super(props);
    this.state = {
      open: true
    }
  }
  var handleSubmit = () => {
    document.getElementById('title').text;
  }
  componentDidMount(){
    //get request for author list
  }
  render(){
    <>
      <Modal show={this.state.open}>
        <Modal.Header>
          {this.props.newBlog && <Modal.Title>Upload New Blog</Modal.Title>}
          {! this.props.newBlog && <Modal.Title>Add Comment</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          <Form>
            {this.props.newBlog &&
              <Form.Group controlId="title">
                <Form.Label>Title<Form.Label>
                <Form.Control placeholder="Blog" id="blog-title" />
              </Form.Group>
            }
            {this.props.newBlog &&
              <Form.Group controlId="Author">
                <Form.Label>Select Author<Form.Label>
              //make into select box from authorlist
                //<Form.Control placeholder="Blog" id="blog-title" />
              </Form.Group>
            }
            {this.props.newBlog &&
              <Form.Group controlId="synopsis">
                <Form.Label>Summary<Form.Label>
                <Form.Control as="textarea" rows="3" id="blog-synopsis" />
              </Form.Group>
            }
            {this.props.newBlog &&
              <Form.Group controlId="beginning">
                <Form.Label>Preview<Form.Label>
                <Form.Control as="textarea" rows="3" id="blog-beginning" />
              </Form.Group>
            }
            {this.props.newBlog &&
              <Form.Group controlId="Author">
                <Form.Label>Select Author<Form.Label>
              //make into select box from authorlist
                //<Form.Control placeholder="Blog" id="blog-title" />
              </Form.Group>
            }
            {!this.props.newBlog &&
              <Form.Group controlId="commentText">
                <Form.Label>Preview<Form.Label>
                <Form.Control as="textarea" rows="3" id="comment-text" />
              </Form.Group>
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({open: false})}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}

export default BlogViewer;
