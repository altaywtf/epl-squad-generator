import { observable, action, createTransformer } from 'mobx'
import Api from '../api'

class PlayerStore {
  @observable players = []

  getPlayersByPosition = createTransformer(value =>
    this.players.filter(player => player.position === value)
  )

  @action fetchPlayers() {
    Api
      .fetchPlayers()
      .then(res => this.players = res.players)
  }
}

export default new PlayerStore()

