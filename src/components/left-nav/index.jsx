import React, { Component } from "react"
import "./index.less"
import logo from "../../assets/images/logo.png"
import { Link, withRouter } from "react-router-dom"
import { Menu, Icon } from "antd"
import menuList from "../../config/menuConfig"

const { SubMenu } = Menu

class LeftNav extends Component {
  // 根据menu的数据数组生成对应的标签数组  使用map() + 递归调用
  getMenuNodes = menuList => {
    const path = window.location.pathname  // 得到当前请求的路径
    return menuList.map(item => {
      if (!item.children) {  // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        // const cItem = item.children.find(cItem=>cItem.key===path) //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0) //查找一个与当前请求路径匹配的子Item
        if(cItem){
          this.openKey = item.key  //如果存在,说明当前item的子列表需要打开
        }
        return (
          <SubMenu key={item.key} title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
   /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    let path = window.location.pathname // 得到当前请求的路由路径
    if(path.indexOf('/product')===0){ //indexOf匹配,返回的是:匹配到的值的下标
      path = '/product'
    }

    const openKey = this.openKey  // 得到需要打开菜单项的key

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)

