import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home.js'
import Resume from './Resume.js'
import Blog from './Blog.js'
import BlogViewer from './BlogViewer.js'

function Main () {
  return (
    <>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/resume' component={Resume} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/:id' component={BlogViewer} />
      </Router>
    </>
  )
}

export default Main
