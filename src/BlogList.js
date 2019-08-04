import './Home.css'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
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

  render () {
    if (this.state.blogs) {
      console.log(this.state.blogs)
      const list = this.state.blogs.map((entry) => {
        return (
          <ListGroup.Item as='li' key={entry.ID} onClick={() => {
            this.props.history.push('/blog/' + entry.ID)
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
