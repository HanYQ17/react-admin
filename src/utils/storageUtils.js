/**
 * 进行localStorage数据存储管理的工具模块
 * 但直接使用localStorage会有兼容问题,可以使用插件store(github上搜索)
 */

import store from 'store' // yarn add store
const USER_KEY = 'user_key'
export default {
    saveUser(user) { //保存
        // localStorage.setItem(USER_KEY, Json.stringify(user))
        store.set(USER_KEY, user)
    },

    getUser() {  //获取
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
       return store.get(USER_KEY) || {}
    },

    removeUser() {  //移出
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}




