/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:26:06
 * @LastEditTime: 2019-08-12 18:16:05
 * @LastEditors: Please set LastEditors
 */



import {createStore,applyMiddleware} from 'redux'  //npm install --save redux
import thunk from 'redux-thunk' // npm install --save redux-thunk  用来实现redux异步的redux中间件插件
import {composeWithDevTools} from 'redux-devtools-extension' // npm install --save-dev redux-devtools-extension  调试工具
import {combineReducers} from 'redux' //合并多个reducer函数

const INCREMENT = 'increment'
const DECREMENT = 'decrement'

// 管理count状态数据的reducer
function count(state=0,action){
    switch (action.type){
        case INCREMENT:
            return state+action.data
        case DECREMENT:
            return state-action.data
        default:
            return state
    }
}

const initUser = {}
//管理user状态数据的reducer
function user(state=initUser,action){
    switch (action.type){
        default:
            return state
    }
}

// 增加的同步action: 返回的是对象
export const increment = number => ({type: INCREMENT, data: number})

// 减少的同步action: 返回的是对象
export const decrement = number => ({type: DECREMENT, data: number})

// 增加的异步action: 返回的是函数
export const incrementAsync = number => {
    return dispatch => {
        setTimeout(()=>{  // 1.执行异步(定时器,ajax请求,promise)
            dispatch(increment(number))  //2.当前异步任务执行完成时,分发一个同步的action:即一个对象
        },100)
    }
}

const cReducers = combineReducers({count,user})

export default createStore(cReducers,composeWithDevTools(applyMiddleware(thunk)))

/*

getState(): 得到 state
dispatch(action): 分发 action, 触发 reducer 调用, 产生新的 state
subscribe(listener): 注册监听, 当产生了新的 state 时, 自动调用

*/