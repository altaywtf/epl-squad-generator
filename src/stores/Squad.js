import { observable, action } from 'mobx'
import shortid from 'shortid'
import PlayerStore from './Player'

class Squad {
  @observable formation
  @observable players = []

  constructor(formation, players) {
    this.id = shortid.generate()
    this.formation = formation
    this.players = players || this.findPlayers()
  }

  findPlayers() {
    return this.formation.positions.map(position =>
      PlayerStore.getRandomPlayer(position, this.players.map(player => player.id))
    )
  }
}

class SquadStore {
  @observable squad
  @observable archivedSquads = []

  @action createSquad(formation) {
    this.squad = new Squad(formation)
  }

  @action archiveSquad() {
    this.archivedSquads.push(this.currentSquad)
  }
}

export default new SquadStore()

