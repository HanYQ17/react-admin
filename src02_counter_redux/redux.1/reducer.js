/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:26:06
 * @LastEditTime: 2019-08-12 15:31:34
 * @LastEditors: Please set LastEditors
 */

/**
 * reducer函数模块: 根据当前state和指定action返回一个新的state
 */

import {INCREMENT, DECREMENT} from './action-types'

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