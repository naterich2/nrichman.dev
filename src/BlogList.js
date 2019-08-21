import './Home.css'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class BlogList extends React.Component {
  // const my_id = this.props.match.params.id;
  constructor (props) {
    super(props)
    this.state = {
      blogs: []
    }
  }

  componentDidMount () {
    fetch('/resources/blog/tag/' + this.props.tagID) // eslint-disable-line no-undef
      .then(resp => {
        return resp.json()
      })
      .then(blog => {
        this.setState({ blogs: blog })
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.tagID !== prevProps.tagID) { // Tag ID changed
      fetch('/resources/blog/tag/' + this.props.tagID) // eslint-disable-line no-undef
        .then(resp => {
          return resp.json()
        })
        .then(blog => {
          this.setState({ blogs: blog })
        })
    }
  }

  render () {
    if (this.state.blogs) {
      console.log(this.state.blogs)
      const list = this.state.blogs.map((entry) => {
        return (
          <ListGroup.Item as='li' key={entry.ID} action onClick={() => {
            this.props.history.push('/blog/' + entry.ID)
          }}>
            <h5>{entry.title}</h5>
            <p>By: {entry.name}</p>
          </ListGroup.Item>
        )
      })
      return (
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup as='ul'>
              {list}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return (<div />)
    }
  }
}

BlogList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  tagID: PropTypes.number.isRequired
}

export default withRouter(BlogList)
