/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 10:37:47
 * @LastEditTime: 2019-08-12 15:34:22
 * @LastEditors: Please set LastEditors
 */

/** 入口js */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import store from './redux/reducer'

ReactDOM.render(<App store={store} />, document.getElementById('root'))

//给store绑定状态更新的监听
store.subscribe(()=>{  //store内部的状态数据发生改变时的回调
    ReactDOM.render(<App store={store} />, document.getElementById('root'))  //重新渲染App组件标签
})