/** 入口js */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import storageUtils from './utils/storageUtils' 
import memoryUtils from './utils/memoryUtils' 

const user = storageUtils.getUser() //获取的用户信息
memoryUtils.user = user //设置到memoryUtils中

ReactDOM.render(<App />, document.getElementById('root'));
