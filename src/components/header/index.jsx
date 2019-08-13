import React, { Component } from "react"
import "./index.less"
import user from "../../utils/memoryUtils" //获取用户信息
import { formatDateTime } from "../../utils/dateUtils" //时间格式
import { reqWeather } from "../../api" //获取请求
import { withRouter } from "react-router-dom"
import menuList from "../../config/menuConfig"
import { Modal } from "antd"
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button' //按钮

import {connect} from 'react-redux' 

class Header extends Component {
  state = {
    currentTime: formatDateTime(new Date()),
    dayPictureUrl: "", //天气图片url
    weather: "" //天气文本
  }

  //   每个1s获取当前时间,并更新状态数据currentTime
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formatDateTime(new Date())
      this.setState({ currentTime })
    }, 1000)
  }

  //   获取天气数据
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather("深圳")
    this.setState({ dayPictureUrl, weather })
  }

  //   根据路由变化title
  getTitle = () => {
    const path = this.props.location.pathname //当前不是路由,需使用withRouter
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        //如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // const cItem = item.children.find(cItem => cItem.key === path) //在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0) //在所有子item中查找匹配的
        if (cItem) {
          //如果优质才说明有匹配
          title = cItem.title //取出它的title
        }
      }
    })
    return title
  }

  //   退出登录
  logout = () => {
    //   使用antd的对话框Modal
    Modal.confirm({
      content: "确定退出登录吗?",
      okText: "退出",
      cancelText: "取消",
      onOk: () => {  //变成箭头函数,因为有this
        // 退出登录: 清除本地数据 及 保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login') //跳转到登录页
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }

  //    第一次render()之后执行一次, 一般在此执行异步操作: 发ajax请求/启动定时器
  componentDidMount() {
    this.getTime() //更新当前时间
    this.getWeather() //获取当前天气
  }

//   当前组件卸载之前调用  清除定时器
  componentWillUnmount(){
    clearInterval(this.intervalId)  
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const { username } = user.user
    // const title = this.getTitle() //得到当前需要显示的title
    const title = this.props.headTitle
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headTitle:state.headTitle}),  //初始值
  {}   //方法
)(withRouter(Header))