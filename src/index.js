import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import playerStore from './stores/Player'
import squadStore from './stores/Squad'

const stores = {
  playerStore,
  squadStore,
}

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('root'))

registerServiceWorker()

