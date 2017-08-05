import { observable, action } from 'mobx'
import shortid from 'shortid'
import PlayerStore from './Player'

class Squad {
  @observable formation
  @observable players

  constructor(formation, players = []) {
    this.id = shortid.generate()
    this.formation = formation
    this.players = players

    if (!players.length) {
      this.findPlayers()
    }
  }

  findPlayers() {
    this.formation.positions.forEach((position) => {
      const player = PlayerStore.getRandomPlayer(position, this.players.map(player => player.id))
      this.players.push(player)
    })
  }

  @action addPlayer(player) {
    this.players.push(player)
  }

  @action setFormation(selection) {
    this.formation = selection
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

