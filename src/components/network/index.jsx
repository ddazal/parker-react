import './index.css'
import React, { Component } from 'react'
import ColorPicker from '../color-picker'
import FaCog from 'react-icons/lib/fa/cog'
import FaShareAlt from 'react-icons/lib/fa/share-alt'
import Tab from '../tabs/tab'
import Tabs from '../tabs/tabs'
import vis from 'vis'

//y ahora? el directorio creo, jaja no veo el directorio solo e archivo, abralo a ver
// Bueno, en la carpeta de components hay uno que se llama color-picker, si quiere revise el codigo y me avisa cuando acabe

class Network extends Component {
  constructor (props) {
    super(props)
    this.shapes = ['ellipse', 'circle', 'database', 'box', 'text', 'diamond', 'dot', 'star', 'triangle', 'hexagon', 'square'],
    this.state = {
      nodes: [],
      edges: [],
      settings: false,
      selected: {
        node: undefined,
        edge: undefined
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
    window.network = new vis.Network(container, data, {
      nodes: {
        color: '#D2E5FF',
        shape: 'circle',
        font: {
          color: '#343434',
          size: 14
        }
      },
      color: {
        color: '#848484'
      }
    })
    this.addListeners()
  }
  addListeners = () => {
    const { state } = this.props.location
    const { network } = window
    network.on('selectNode', event => {
      const node = state.nodes.find(node => node.id === event.nodes[0])
      this.setState({
        settings: true,
        selected: { node }
      })
    })
    network.on('deselectNode', () => {
      this.setState({
        settings: false,
        selected: { node: undefined }
      })
    })
  }
  changeNodeBackgroundColor = color => {
    const node = Object.assign(this.state.selected.node, { color })
    this.state.nodes.update(node)
  }
  changeNodeLabelColor = color => {
    const node = Object.assign(this.state.selected.node, { font: { color } })
    this.state.nodes.update(node)
  }
  changeNodeShape = shape => {
    const node = Object.assign(this.state.selected.node, { shape })
    this.state.nodes.update(node)
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
        // Node settings
        <div className="settings container" style={{ display: this.state.settings ? 'block' : 'none' }}>
          <Tabs>
            <Tab title="Label">
              <ColorPicker theme="shades" onclick={this.chandeNodeLabelColor} />
            </Tab>
            <Tab title="Color">
              <ColorPicker theme="material" onclick={this.changeNodeBackgroundColor} />
            </Tab>
            <Tab title="Shape">
              <div className="shapes">
                {
                  this.shapes.map((shape, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => this.changeNodeShape(shape)}
                        className="shape-btn">
                        {shape}
                      </button>
                    )
                  })
                }
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Network
