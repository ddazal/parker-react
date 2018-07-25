import './index.css'
import React, { Component } from 'react'
import ColorPicker from '../color-picker'
import FaCog from 'react-icons/lib/fa/cog'
import FaShareAlt from 'react-icons/lib/fa/share-alt'
import Tab from '../tabs/tab'
import Tabs from '../tabs/tabs'
import axios from 'axios'
import swal from 'sweetalert2'
import vis from 'vis'

class Network extends Component {
  constructor (props) {
    super(props)
    this.shapes = {
      inside: ['ellipse', 'circle', 'database', 'box', 'text'],
      outside: ['diamond', 'dot', 'star', 'triangle', 'hexagon', 'square']
    }
    this.state = {
      nodes: [],
      edges: [],
      settings: {
        node: false,
        edge: false,
        general: false
      },
      selected: {
        node: undefined,
        edge: undefined
      }
    }
    this.defaults = props.location.state.defaults
  }
  componentDidMount () {
    const { state } = this.props.location
    const nodes = new vis.DataSet(state.nodes)
    const edges = new vis.DataSet(state.edges)
    const data = { nodes, edges }
    this.setState({ nodes, edges })
    const container = document.getElementById('canvas')
    window.network = new vis.Network(container, data, {})
    this.addListeners()
  }
  addListeners = () => {
    const { network } = window
    network.on('click', event => {
      const nodeId = event.nodes[0]
      const edgeId = event.edges[0]
      if (nodeId) {
        const node = this.state.nodes.get(nodeId)
        this.setState({
          settings: { node: true, edge: false, general: false },
          selected: { node, edge: undefined }
        })
      } else if (edgeId) {
        const edge = this.state.edges.get(edgeId)
        this.setState({
          settings: { node: false, edge: true, general: false },
          selected: { edge, node: undefined }
        })
      } else {
        this.setState({
          settings: { node: false, edge: false, general: false },
          selected: { node: undefined, edge: undefined }
        })
      }
    })
  }
  openGeneralSettings = event => {
    this.setState({
      settings: { node: false, edge: false, general: true },
      selected: { node: undefined, edge: undefined }
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
  changeEdgeColor = color => {
    const edge = Object.assign(this.state.selected.edge, { color: { color, highlight: color } })
    this.state.edges.update(edge)
  }
  changeEdgeArrowFrom = event => {
    const { checked } = event.target
    const edge = Object.assign(this.state.selected.edge, { arrows: { from: checked } })
    this.state.edges.update(edge)
  }
  changeEdgeArrowTo = event => {
    const { checked } = event.target
    const edge = Object.assign(this.state.selected.edge, { arrows: { to: checked } })
    this.state.edges.update(edge)
  }
  changeNodeSize = event => {
    const { value: size } = event.target
    const node = Object.assign(this.state.selected.node, { size })
    this.state.nodes.update(node)
  }
  changeNodesBackgroundColor = color => {
    this.state.nodes.get().forEach(node => this.state.nodes.update({ ...node, color }))
  }
  changeNodesLabelColor = color => {
    this.state.nodes.get().forEach(node => this.state.nodes.update({ ...node, font: { color } }))
  }
  changeNodesShape = shape => {
    this.state.nodes.get().forEach(node => this.state.nodes.update({ ...node, shape }))
  }
  changeNodesSize = event => {
    const { value: size } = event.target
    this.state.nodes.get().forEach(node => this.state.nodes.update({ ...node, size }))
  }
  changeEdgesColor = color => {
    this.state.edges.get().forEach(edge => this.state.edges.update({ ...edge, color: { color, highlight: color } }))
  }
  changeEdgesArrowFrom = event => {
    const { checked } = event.target
    this.state.edges.get().forEach(edge => this.state.edges.update({ ...edge, arrows: { from: checked } }))
  }
  changeEdgesArrowTo = event => {
    let { checked } = event.target
    this.state.edges.get().forEach(edge => this.state.edges.update({ ...edge, arrows: { to: checked } }))
  }
  share = () => {
    const nodes = this.state.nodes.get()
    const edges = this.state.edges.get()
    const title = this.props.location.state.googleSheetName
    axios.post('https://parker-gen.herokuapp.com/sharer', { nodes, edges, title })
      .then(results => {
        const { type, text, title } = results.data
        swal({ type, text, title })
      })
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
              <a className="action column h-centered" onClick={this.openGeneralSettings}>
                <FaCog />
                <small>Settings</small>
              </a>
              <a className="action column h-centered" onClick={this.share}>
                <FaShareAlt />
                <small>Share</small>
              </a>
            </div>
          </div>
        </header>
        <div id="canvas"></div>
        {/* Node settings */}
        <div className="settings container" style={{ display: this.state.settings.node ? 'block' : 'none' }}>
          <Tabs>
            <Tab title="Label">
              <ColorPicker theme="shades" onclick={this.changeNodeLabelColor} />
            </Tab>
            <Tab title="Color">
              <ColorPicker theme="material" onclick={this.changeNodeBackgroundColor} />
            </Tab>
            <Tab title="Shape">
              <p>Label inside node</p>
              <div className="shapes">
                {
                  this.shapes.inside.map((shape, index) => {
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
              <p>Label outside node</p>
              <div className="shapes">
                {
                  this.shapes.outside.map((shape, index) => {
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
            <Tab title="Size">
              <p style={{ marginTop: 0 }}>Node size<sup><small>*</small></sup></p>
              <input
                type="number"
                min="1"
                max="50"
                onChange={this.changeNodeSize}
                className="tab-input"/>
              <div style={{ marginTop: 16 }}>
                <small>*<i>Size only affects the nodes that place the label outside them</i></small>
              </div>
            </Tab>
          </Tabs>
        </div>
        {/* Edges settings */}
        <div className="settings container" style={{ display: this.state.settings.edge ? 'block' : 'none' }}>
          <Tabs>
            <Tab title="Color">
              <ColorPicker theme="material" onclick={this.changeEdgeColor} />
            </Tab>
            <Tab title="Arrow">
              <div className="form-group">
                <label htmlFor="arrowFrom">Show arrow from</label>
                <input
                  type="checkbox"
                  id="arrowFrom"
                  onChange={this.changeEdgeArrowFrom}/>
              </div>
              <div className="form-group">
                <label htmlFor="arrowTo">Show arrow to</label>
                <input
                  type="checkbox"
                  id="arrowTo"
                  onChange={this.changeEdgeArrowTo}/>
              </div>
            </Tab>
          </Tabs>
        </div>
        {/* General settings */}
        <div className="settings container" style={{ display: this.state.settings.general ? 'block' : 'none' }}>
          <Tabs>
            <Tab title="Label (nodes)">
              <ColorPicker theme="shades" onclick={this.changeNodesLabelColor} />
            </Tab>
            <Tab title="Color (nodes)">
              <ColorPicker theme="material" onclick={this.changeNodesBackgroundColor} />
            </Tab>
            <Tab title="Shape (nodes)">
              <p>Label inside node</p>
              <div className="shapes">
                {
                  this.shapes.inside.map((shape, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => this.changeNodesShape(shape)}
                        className="shape-btn">
                        {shape}
                      </button>
                    )
                  })
                }
              </div>
              <p>Label outside node</p>
              <div className="shapes">
                {
                  this.shapes.outside.map((shape, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => this.changeNodesShape(shape)}
                        className="shape-btn">
                        {shape}
                      </button>
                    )
                  })
                }
              </div>
            </Tab>
            <Tab title="Size (nodes)">
              <p style={{ marginTop: 0 }}>Node size<sup><small>*</small></sup></p>
              <input type="number" min="1" max="50" onChange={this.changeNodesSize} className="tab-input"/>
              <div style={{ marginTop: 16 }}>
                <small>*<i>Size only affects the nodes that place the label outside them</i></small>
              </div>
            </Tab>
            <Tab title="Color (edges)">
              <ColorPicker theme="material" onclick={this.changeEdgesColor} />
            </Tab>
            <Tab title="Arrow (edges)">
              <div className="form-group">
                <label htmlFor="arrowFrom">Show arrow from</label>
                <input
                  type="checkbox"
                  id="arrowFrom"
                  onChange={this.changeEdgesArrowFrom}/>
              </div>
              <div className="form-group">
                <label htmlFor="arrowTo">Show arrow to</label>
                <input
                  type="checkbox"
                  id="arrowTo"
                  onChange={this.changeEdgesArrowTo}/>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Network
