class Api {
  constructor(options = {}) {
    this.token = options.token
    this.baseURL = 'http://api.football-data.org/v1'
  }

  // Teams of a Specific Competition
  fetchTeams = (competitionID) => this.send(`${this.baseURL}/competitions/${competitionID}/teams`)

  // Players of a Specific Team
  fetchPlayers = (teamID) => this.send(`${this.baseURL}/teams/${teamID}/players`)

  // All Players from a Competition
  fetchAllPlayers = (competitionID) => {
    return this.fetchTeams(competitionID)
      .then(({ teams }) => {
        return Promise
          .all(teams.map(t => this.send(t._links.players.href)))
          .then(res => res.map((result, index) => result.players.map(player => Object.assign(player, { team: teams[index] }))))
          .then(res => res.reduce((src, ind) => src.concat(ind), []))
      })
  }

  send = (url) => new Promise((resolve, reject) => fetch(url, {
    headers: {
      'X-Auth-Token': this.token,
    }
  })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
  )
}

export default new Api({
  // token: '62ab64a9657c4641a574993fcf699e51',
  token: '6fb02f02fe274a70bced416ee51794d5',
})

