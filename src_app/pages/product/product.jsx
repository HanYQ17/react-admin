/**
 * 商品路由
 */

import React, { Component } from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import ProductHome from './home' //默认子路由
import ProductDetail from './detail' //详情子路由
import AddUpdate from './add-update' //添加和更新的子路由
import './product.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact />  {/*加exacr 路径完全匹配*/ }
                <Route path='/product/detail' component={ProductDetail} />
                <Route path='/product/AddUpdate' component={AddUpdate} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
