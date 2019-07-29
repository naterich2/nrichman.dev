import './Home.css';
import { Jumbotron } from 'react-bootstrap';
import React from 'react'
import PropTypes from 'prop-types'
import MainNav from './MainNav.js'
import Live from './Live.js'
import Footer from './Footer.js'
import CodeBlock from './subs/CodeBlock.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import ReactMarkdown from 'react-markdown'

class BlogViewer extends React.Component {
 // const my_id = this.props.match.params.id;
  constructor(props){
    super(props);
    this.state = {
      fulltext: ''
    }
  }
  componentDidMount(){
    fetch('/resources/blog/blog_id/'+this.props.match.params.id)
      .then(resp => {
        return resp.json();
      })
      .then(blog => {
        this.setState({ fulltext: blog.full_text })
      })
  }
  render(){
    console.log(this.props.match.params.id);
    return (
      <div className="blog">
        <Live />
        <div style={{position:'absolute', backgroundAttachment: 'scroll', top:'70%', width:'100%', backgroundColor: '#282c35'}}>
          <MainNav />
          <Jumbotron style={{backgroundAttachment: 'scroll', position: 'relative', left: '15%', width:'70%'}}>
            <ReactMarkdown source={this.state.fulltext} renderers={{code: CodeBlock}}/>
          </Jumbotron>
          <Footer />
        </div>
      </div>
    );
  }
}

BlogViewer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default BlogViewer
