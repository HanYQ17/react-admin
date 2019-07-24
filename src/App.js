/** 应用的根组件 */

import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom' //yarn add react-router-dom

import Login from './pages/admin/admin'
import Admin from './pages/login/login'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

