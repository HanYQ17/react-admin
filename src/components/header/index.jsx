import React, { Component } from "react"
import "./index.less"
import user from "../../utils/memoryUtils" //获取用户信息
import { formatDateTime } from "../../utils/dateUtils" //时间格式
import { reqWeather } from "../../api" //获取请求
import { withRouter } from "react-router-dom"
import menuList from "../../config/menuConfig"

class Header extends Component {
  state = {
    currentTime: formatDateTime(new Date()),
    dayPictureUrl: "", //天气图片url
    weather: "" //天气文本
  }

  //   每个1s获取当前时间,并更新状态数据currentTime
  getTime = () => {
    setInterval(() => {
      const currentTime = formatDateTime(new Date())
      this.setState({ currentTime })
    }, 1000)
  }

  //   获取天气数据
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather("深圳")
    this.setState({ dayPictureUrl, weather })
  }

  //    第一次render()之后执行一次, 一般在此执行异步操作: 发ajax请求/启动定时器
  componentDidMount() {
    this.getTime() //更新当前时间
    this.getWeather() //获取当前天气
  }

  //   根据路由变化title
    getTitle = () => {
      const path = this.props.location.pathname //当前不是路由,需使用withRouter
      let title
      menuList.forEach(item=>{
          if(item.key===path){  //如果当前item对象的key与path一样,item的title就是需要显示的title
              title = item.title
          }else if(item.children){
              const cItem = item.children.find(cItem => cItem.key === path)  //在所有子item中查找匹配的
              if(cItem){  //如果优质才说明有匹配
                  title = cItem.title  //取出它的title
              }
          }
      })
      return title
    }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const { username } = user.user
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <a href="javascript:">退出</a>
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
export default withRouter(Header)
