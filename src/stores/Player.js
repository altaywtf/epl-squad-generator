import { observable, action, createTransformer } from 'mobx'
import Api from '../api'

const storedPlayers = JSON.parse(localStorage.getItem('398:players') || '[]')

class PlayerStore {
  @observable players = storedPlayers
  @observable resolved = !!storedPlayers.length

  getPlayersByPosition = createTransformer(value =>
    this.players.filter(player => player.position === value)
  )

  @action setPlayers(players) {
    localStorage.setItem('398:players', JSON.stringify(players))
    this.resolved = true
    return this.players = players
  }

  @action fetchPlayers() {
    if (!this.resolved) {
      Api
        .fetchAllPlayers('398')
        .then((res) => this.setPlayers(res))
        .catch(console.log)
    }
  }

}

export default new PlayerStore()

