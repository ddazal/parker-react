import React, { Component } from 'react';
import './index.css';
import vis from 'vis';

class Network extends Component {
  constructor (props){
    super(props)
    this.state = {
      nodes: [],
      edges: []
    }
  }
  componentDidMount () {
    const { state } = this.props.location
    const nodes = new vis.DataSet(state.nodes)
    const edges = new vis.DataSet(state.edges)
    const data = { nodes, edges }
    this.setState({ nodes, edges })
    const container = document.getElementById('network')
    new vis.Network(container, data, {})
  }
  render () {
    return(
      <div id="network">
      </div>
    )
  }
}

export default Network;
