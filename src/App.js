import React, {Component} from 'react'
import './App.scss'
import {Home} from "./Home"

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <h2>Praxis</h2>
        </div>
        <div className="content">
          <Home/>
        </div>
      </div>
    )
  }
}

export default App
