/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:26:06
 * @LastEditTime: 2019-08-12 15:59:53
 * @LastEditors: Please set LastEditors
 */



import {createStore} from 'redux'  //npm install --save redux

const INCREMENT = 'increment'
const DECREMENT = 'decrement'

// 管理count状态数据的reducer
export function count(state=0,action){
    switch (action.type){
        case INCREMENT:
            return state+action.data
        case DECREMENT:
            return state-action.data
        default:
            return state
    }
}

// 增加的action
export const increment = number => ({type: INCREMENT, data: number})

// 减少的action
export const decrement = number => ({type: DECREMENT, data: number})

export default createStore(count)

/*

getState(): 得到 state
dispatch(action): 分发 action, 触发 reducer 调用, 产生新的 state
subscribe(listener): 注册监听, 当产生了新的 state 时, 自动调用

*/