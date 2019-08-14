/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 18:17:39
 * @LastEditTime: 2019-08-14 15:59:46
 * @LastEditors: Please set LastEditors
 */
/** 应用的根组件 */

import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom' //yarn add react-router-dom

import Admin from './pages/admin/admin'
import Login from './pages/login/login'


export default class App extends Component {
  render() {
    return (
      // <HashRouter>
      <HashRouter>  
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </HashRouter>
      // </BrowserRouter>
    )
  }
}

