import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import './style.css'

import FORMATIONS from '../../constants/formations'

@inject('playerStore', 'squadStore')
@observer
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      formationName: '',
    }
  }

  componentDidMount() {
    this.props.playerStore.fetchPlayers()
  }

  onSelectFormation = (event) => {
    this.setState({
      formationName: event.target.value,
    }, () => this.onCreateSquad())
  }

  onCreateSquad = () => {
    const formation = FORMATIONS.find(f => f.name === this.state.formationName)
    this.props.squadStore.createSquad(formation)
  }

  render() {
    return (
      <div className="App">
        <select value={this.state.formationName} onChange={this.onSelectFormation}>
          <option value="" disabled>
            Select a Formation
          </option>

          {FORMATIONS.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {this.props.squadStore.squad &&
          <ul>
            {this.props.squadStore.squad.players.map(p => (
              <li key={p.id}>
                {p.position} - {p.name}
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

App.propTypes = {
  playerStore: PropTypes.object,
  squadStore: PropTypes.object,
}

