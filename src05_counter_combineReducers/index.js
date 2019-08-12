/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 10:37:47
 * @LastEditTime: 2019-08-12 16:49:45
 * @LastEditors: Please set LastEditors
 */

/** 入口js */

import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux' //npm install --save react-redux
import App from './App'
import store from './redux/reducer'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))

