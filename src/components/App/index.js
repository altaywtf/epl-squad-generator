import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import logo from './logo.svg'
import './style.css'

@inject('playerStore', 'squadStore')
@observer
export default class App extends Component {
  componentDidMount() {
    this.props.playerStore.fetchPlayers()
  }

  render() {
    console.log(this.props)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.props.playerStore.players.length}
        </p>
      </div>
    )
  }
}

