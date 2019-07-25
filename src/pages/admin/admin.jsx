import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 判断,没登录就跳转到登录页
        if(!user || !user._id){
            return <Redirect to='/login' />
        }
        return (
            <div>
                首页 
                {user.username}
            </div>
        )
    }
}
