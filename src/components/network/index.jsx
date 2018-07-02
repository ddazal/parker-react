import './index.css'
import FaCog from 'react-icons/lib/fa/cog'
import FaShareAlt from 'react-icons/lib/fa/share-alt'
import React, { Component } from 'react'
import Tab from '../tabs/tab'
import Tabs from '../tabs/tabs'
import vis from 'vis'

class Network extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      edges: [],
      settings: false,
      selected: {
        node: undefined
      }
    }
  }
  componentDidMount () {
    const { state } = this.props.location
    const nodes = new vis.DataSet(state.nodes)
    const edges = new vis.DataSet(state.edges)
    const data = { nodes, edges }
    this.setState({ nodes, edges })
    const container = document.getElementById('canvas')
    const network = new vis.Network(container, data, {})
    this.addListeners(network)
  }
  addListeners = network => {
    const { state } = this.props.location
    network.on('selectNode', event => {
      const selected = state.nodes.find(node => node.id === event.nodes[0])
      console.log(selected)
      this.setState({ settings: true })
    })
    network.on('deselectNode', () => this.setState({ settings: false }))
    network.on('deselectEdge', () => this.setState({ settings: false }))
  }
  render () {
    return (
      <div id="network" className="column">
        <header>
          <div className="container line justify-between v-centered">
            <p className="header-title column">
              <span>{ this.props.location.state.googleSheetName }</span>
            </p>
            <div className="header-actions line">
              <a className="action column h-centered">
                <FaCog />
                <small>Settings</small>
              </a>
              <a className="action column h-centered">
                <FaShareAlt />
                <small>Share</small>
              </a>
            </div>
          </div>
        </header>
        <div id="canvas"></div>
        <div className="settings container" style={{ display: this.state.settings ? 'block' : 'none' }}>
          <Tabs>
            <Tab title="Label">
              <p>Label</p>
            </Tab>
            <Tab title="Color">
              <p>Color</p>
            </Tab>
            <Tab title="Shape">
              <p>Shape</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Network
