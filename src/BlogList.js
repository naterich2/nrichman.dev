import './Home.css'
import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

class BlogList extends React.Component {
  // const my_id = this.props.match.params.id;
  constructor (props) {
    super(props)
    this.state = {
      blogs: {}
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

  render () {
    const list = blog.map((entry) => {
      return (
        <ListGroup.Item as='li' key={entry.ID} onClick={() => {
          this.props.history.push('/blog/'+entry.ID);
        }}>
          <h5>{entry.title}</h5>
          <p>By: {entry.name}</p>
        </ListGroup.Item>
      )
    })
    return (
      <div className='blogList'>
        <ListGroup as='ul'>
          {list}
        </ListGroup>
      </div>
    )
  }
}

BlogList.propTypes = {
  match: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired,
  tagID: PropTypes.number.isRequired
}

export default withRouter(BlogList)
