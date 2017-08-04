class Api {
  constructor(options = {}) {
    this.token = options.token
    this.baseURL = 'http://api.football-data.org/v1'
  }

  fetchPlayers = () => {
    // DEMO
    return this.send('teams/66/players')
  }

  send = (url) => new Promise((resolve, reject) => {
    fetch(`${this.baseURL}/${url}`, {
      headers: {
        'X-Auth-Token': this.token,
      }
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export default new Api({
  token: '62ab64a9657c4641a574993fcf699e51',
})

