import './index.css'
import React, { Component } from 'react'
import Tabletop from 'tabletop'
import { ClipLoader } from 'react-spinners'

class Home extends Component {
  constructor (props) {
    super(props)
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
        const nodes = tabletop.sheets('nodes').all()
        const edges = tabletop.sheets('edges').all()
        this.setState({ loading: false })
        this.props.history.push({
          pathname: '/network',
          state: { nodes, edges, googleSheetName }
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
            <h3 className="header__subtitle">Build and share your own networks</h3>
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
        <div className="container">
          <h3>Read this first!</h3>
        </div>
      </div>
    )
  }
}

export default Home
