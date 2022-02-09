import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TempGuessGame from './pages/TempGuessGame'

export default function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <TempGuessGame />
        </Route>
      </Switch>
    </Router>
  )
}
