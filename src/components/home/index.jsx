import './index.css'
import React, { Component } from 'react'
import Tabletop from 'tabletop'
import { ClipLoader } from 'react-spinners'
import settingsImage from '../../assets/settings.png'

class Home extends Component {
  constructor (props) {
    super(props)
    this.defaults = {
      nodes: {
        color: '#D2E5FF',
        shape: 'circle',
        font: {
          color: '#343434',
          size: 14
        },
        mass: 2,
        size: 25
      },
      edges: {
        arrows: {
          to: true,
          from: false
        },
        color: {
          color: '#848484'
        }
      }
    }
    this.state = {
      url: '',
      loading: false
    }
  }
  getData = (evt) => {
    const { keyCode } = evt
    if (keyCode !== 13) return
    this.setState({ loading: true })
    Tabletop.init({
      key: this.state.url,
      callback: (data, tabletop) => {
        const { googleSheetName } = tabletop
        const nodes = tabletop.sheets('nodes').all().map(node => ({ ...this.defaults.nodes, ...node }))
        const edges = tabletop.sheets('edges').all().map(edge => ({ ...this.defaults.edges, ...edge }))
        this.setState({ loading: false })
        this.props.history.push({
          pathname: '/network',
          state: { nodes, edges, googleSheetName, defaults: this.defaults }
        })
      }
    })
  }
  changeState = () => {
    this.setState({
      url: this.search.value
    })
  }
  render () {
    const { loading } = this.state
    return (
      <div id="home">
        <header className="column v-centered header">
          <div className="container">
            <h1 className="header__title">Parker</h1>
            <h3 className="header__subtitle">Build and share your own network visualization</h3>
          </div>
        </header>
        <div className="search column">
          <input
            type="text"
            placeholder="Google spreadsheet URL"
            ref={ search => { this.search = search } }
            onChange={this.changeState}
            onClick={({ target }) => target.select()}
            onKeyUp={this.getData}
            autoFocus
          />
          <div className="spinner">
            <ClipLoader
              size={20}
              color={'#f5f749'}
              loading={loading}
            />
          </div>
        </div>
        <div className="container container_sm">
          <h4 className="title">What is Parker?</h4>
          <p className="content">Parker is an open source, free and easy to use tool that enables anyone to build and share a network visualization using a Google spreadsheet to manage the data.</p>
          <h4 className="title">Wait... network visualization?</h4>
          <p className="content">The best definition we have found is this:</p>
          <blockquote cite="http://datavizproject.com/data-type/network-visualisation/">
            <p className="content">
              Network visualisation is often used to visualise complex relationships between a huge amount of elements. A network visualisation displays undirected and directed graph structures. This type of visualization illuminates relationships between entities. Entities are displayed as round <strong>nodes</strong> and <strong>lines</strong> show the relationships between them. The vivid display of network nodes can highlight non-trivial data discrepancies that may be otherwise be overlooked.
            </p>
          </blockquote>
          <p className="disclaimer content">Taken from <a href="http://datavizproject.com/data-type/network-visualisation/" target="_blank" rel="noopener noreferrer">Data Viz Project</a></p>
          <p className="content">As you may notice, there are two bold words in the quote above: nodes and lines. In Parker, we renamed lines to <strong>edges</strong>.</p>
          <h4 className="title">Got it! How do I build one?</h4>
          <ol className="content instructions">
            <li className="step">
              <div className="step__number">1. </div>
              <div className="step__detail">
                <p><strong>Create a Google spreadsheet</strong></p>
                <p>Done with the first step.</p>
              </div>
            </li>
            <li className="step">
              <div className="step__number">2. </div>
              <div className="step__detail">
                <p><strong>Describe your nodes</strong></p>
                <p>You are going to need two columns and the column headers must be named as <strong>id</strong> and <strong>label</strong>. The id must be unique within the entire data set and the label is the text you want to display in the network for each node. Then, rename the actual tab to <strong>nodes</strong>.</p>
              </div>
            </li>
            <li className="step">
              <div className="step__number">3. </div>
              <div className="step__detail">
                <p><strong>Describe your edges</strong></p>
                <p>Create a new tab and name it <strong>edges</strong>. {'Let\'s'} assume that in the step above you created a node with id <strong>A</strong> and a node with id <strong>B</strong> and {'let\'s'} also assume that the link comes out <strong>from</strong> A <strong>to</strong> B.</p>
                <p>In order to create a connection, you are going to need two columns and the column headers must be named as <strong>from</strong> and <strong>to</strong> and their values must be the ids of the nodes that you want to get connected. In this case: from = A and to = B.</p>
                <p>Optionally, you can create a third column named <strong>label</strong> to describe the relationship between the nodes.</p>
              </div>
            </li>
            <li className="step">
              <div className="step__number">4. </div>
              <div className="step__detail">
                <p><strong>Go public</strong></p>
                <p>{'It\'s'} time to publish your spreadsheet to the world. Go to <code>File {'>'} Publish to the Web</code> and press <code>Publish</code>. Now copy the URL from the {'browser\'s'} adress bar, paste it in the input that is floating at the top, hit enter and voilà, your network is ready.</p>
              </div>
            </li>
          </ol>
          <h4 className="title">Cool! What else can I do?</h4>
          <p className="content">Customize and share your network.</p>
          <p className="content">For the nodes you can change their background color, their label color, their shape and their size. For the edges you can change their color and the direction of their arrow.</p>
          <p className="content">Either clicking on the entity itself (node, edge) or clicking in the <strong>settings</strong> button placed in the navbar will open a box where you can manage the customization</p>
          <img src={settingsImage} alt="" style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}/>
          <p className="content">Last, but not least, share your network by clicking on the correspondent button. This will give you an iframe html code that you can paste within your personal blog or into a CMS editor. Either if you are a data journalism or a person interested in data visualization this tool will give you superpowers</p>
        </div>
        <footer>From Colombia with ❤ to the world</footer>
      </div>
    )
  }
}

export default Home
