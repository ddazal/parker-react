import './tabs.css'
import React, { Component } from 'react'

class Tabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: this.props.active || 0
    }
  }
  setActive = (event, index) => {
    event.preventDefault()
    this.setState({ active: index })
  }
  renderTabList = () => {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        current: this.state.active,
        handleClick: this.setActive,
        index
      })
    })
  }
  render () {
    return (
      <div className="tabs">
        <ul className="tabs-list line">
          { this.renderTabList() }
        </ul>
        <div className="tabs-content">
          { this.props.children[this.state.active].props.children }
        </div>
      </div>
    )
  }
}

export default Tabs
