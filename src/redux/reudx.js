/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:28:57
 * @LastEditTime: 2019-08-13 16:33:57
 * @LastEditors: Please set LastEditors
 */
/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
 
import {createStore,applyMiddleware} from 'redux'  //npm install --save redux
import thunk from 'redux-thunk' // npm install --save redux-thunk  用来实现redux异步的redux中间件插件
import {composeWithDevTools} from 'redux-devtools-extension' // npm install --save-dev redux-devtools-extension  调试工具
import {combineReducers} from 'redux' //合并多个reducer函数

import storageUtils from '../utils/storageUtils'
import {reqLogin} from '../api'
// import { message } from 'antd'

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
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            // state.errorMsg = errorMsg //不能直接修改原本状态数据
            return {...state,errorMsg}  //在原本数据下加上errorMsg数据
        case RESET_USER:
            return {}  //退出登录,清空数据
        default:
            return state
    }
}

const receiveUser = (user) => ({type:RECEIVE_USER,user})  //接收用户的同步action
const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG,errorMsg})  //显示错误信息同步action
// 登陆的异步action
export const login = (username, password) =>{
    return async dispatch=>{
        const result = await reqLogin(username, password)
        if(result.status===0){
            const user = result.data
            storageUtils.saveUser(user)  //保存在local中
            dispatch(receiveUser(user))
        }else{
            const msg = result.msg
            dispatch(showErrorMsg(msg))  //把msg数据保存起来
        }
    }
}
// 退出登陆的同步action
export const logout = () => {
    storageUtils.removeUser() //删除local中的user
    return {type:RESET_USER}  //返回action对象,退出不需要数据
}

const cReducers = combineReducers({headTitle,user})  //合并1和2的reducer函数
export default createStore(cReducers,composeWithDevTools(applyMiddleware(thunk)))
