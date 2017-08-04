import { observable, action } from 'mobx'
import FORMATIONS from '../constants/formations'

class Squad {
  @observable formation
  @observable players

  constructor(formation, players = []) {
    this.id = Math.random()
    this.formation = formation
    this.players = players
  }

  @action addPlayer(player) {
    this.players.push(player)
  }

  @action setFormation(selection) {
    this.formation = selection
  }
}

class SquadStore {
  @observable currentSquad
  @observable archivedSquads = []

  constructor() {
    this.currentSquad = new Squad(FORMATIONS[0])
  }

  @action archiveSquad() {
    this.archivedSquads.push(this.currentSquad)
    this.currentSquad = new Squad(FORMATIONS[0])
  }
}

export default new SquadStore()

