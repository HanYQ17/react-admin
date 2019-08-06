import React, { Component } from "react"
import memoryUtils from "../../utils/memoryUtils"
import { Redirect, Route, Switch } from "react-router-dom"
import LeftNav from "../../components/left-nav" //左侧菜单
import Header from "../../components/header" //顶部
import { Layout } from "antd"

import Home from "../home/home"
import Category from "../category/category"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
import Product from "../product/product"
import Role from "../role/role"
import User from "../user/user"

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 判断,没登录就跳转到登录页
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          {/* 左侧菜单栏 */}
          <LeftNav />
        </Sider>
        <Layout>
          {/* 头部 */}
          <Header>header</Header>

          {/* 路由 */}
          <Content style={{ margin: 20, backgroundColor: "#fff" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>

          {/* 底部 */}
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
