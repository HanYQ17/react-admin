/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 18:17:39
 * @LastEditTime: 2019-08-13 10:39:25
 * @LastEditors: Please set LastEditors
 */

 
/** 入口js */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import storageUtils from './utils/storageUtils'
// import memoryUtils from './utils/memoryUtils'
import { Provider } from 'react-redux' //npm install --save react-redux
import store from './redux/reudx'

// const user = storageUtils.getUser() //获取的用户信息
// memoryUtils.user = user //设置到memoryUtils中

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
