import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TempGuessGame from './pages/TempGuessGame'

export default function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <TempGuessGame mode='citiesandmaps' />
        </Route>

        <Route path='/cities' exact>
          <TempGuessGame mode='cities' />
        </Route>

        <Route path='/maps' exact>
          <TempGuessGame mode='maps' />
        </Route>

        <Route path='/citiesandmaps' exact>
          <TempGuessGame mode='citiesandmaps' />
        </Route>
      </Switch>
    </Router>
  )
}
