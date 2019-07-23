import './Home.css';
import { Jumbotron } from 'react-bootstrap';
import React from 'react'
import MainNav from './MainNav.js'
import Live from './Live.js'
import Footer from './Footer.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import ReactMarkdown from 'react-markdown'

class BlogViewer extends React.Component {
 // const my_id = this.props.match.params.id;
  render(){
    console.log(this.props.match.id);
  const mark = "# My first markdown!";
    return (
      <div className="blog">
        <Live />
        <div style={{position:'absolute', backgroundAttachment: 'scroll', top:'70%', width:'100%', backgroundColor: '#282c35'}}>
          <MainNav />
          <Jumbotron style={{backgroundAttachment: 'scroll', position: 'relative', left: '15%', width:'70%'}}>
            <ReactMarkdown source={mark} />
          </Jumbotron>
          <Footer />
        </div>
      </div>
    );
  }
}

export default BlogViewer;
