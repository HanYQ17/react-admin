/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:28:57
 * @LastEditTime: 2019-08-13 11:03:54
 * @LastEditors: Please set LastEditors
 */

 
import {createStore,applyMiddleware} from 'redux'  //npm install --save redux
import thunk from 'redux-thunk' // npm install --save redux-thunk  用来实现redux异步的redux中间件插件
import {composeWithDevTools} from 'redux-devtools-extension' // npm install --save-dev redux-devtools-extension  调试工具
import {combineReducers} from 'redux' //合并多个reducer函数

import storageUtils from '../utils/storageUtils'



// 包含n个action的type常量标识名称的模块
export const SET_HEAD_TITLE = 'set_head_title' // 设置头部标题
export const RECEIVE_USER = 'receive_user'  // 接收用户信息
export const SHOW_ERROR_MSG = 'show_error_msg' // 显示错误信息
export const RESET_USER = 'reset_user' // 重置用户信息


// 1.管理头部标题的reducer函数
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action){
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

// 设置头部标题的同步action
export const setHeadTitle = headTitle => ({type:SET_HEAD_TITLE,data:headTitle})









// 2.管理当前登录用户的reducer函数
const initUser = storageUtils.getUser()  //直接获取用户信息
function user(state=initUser,action){
    switch(action.type){
        default:
            return state
    }
}

const cReducers = combineReducers({headTitle,user})  //合并1和2的reducer函数

export default createStore(cReducers,composeWithDevTools(applyMiddleware(thunk)))
