import React from 'react'
import PropTypes from 'prop-types'
const hljs = window.hljs

class CodeBlock extends React.Component {
  constructor (props) {
    super(props)
    this.ref_element = null
    this.setRef = element => {
      this.ref_element = element
    }
  }

  // Highlight element on component mount and update
  // https://github.com/rexxars/react-markdown/blob/master/demo/src/code-block.js
  componentDidMount () {
    hljs.highlightBlock(this.ref_element)
  }

  componentDidUpdate () {
    hljs.highlightBlock(this.ref_element)
  }

  render () {
    // Set code ref to ref_element
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>{this.props.value}</code>
      </pre>
    )
  }
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string.isRequired
}

CodeBlock.defaultProps = {
  language: 'bash'
}

export default CodeBlock
