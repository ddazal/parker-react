import './tab.css'
import React, { Component } from 'react'

class Tab extends Component {
  render () {
    const { index, handleClick, current } = this.props
    return (
      <li className={index === current ? 'tab is-active' : 'tab'}>
        <a
          onClick={ (event) => handleClick(event, index) }>
          { this.props.title }
        </a>
      </li>
    )
  }
}

export default Tab
