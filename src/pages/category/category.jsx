/**
 * 商品分类路由
 */

import React, { Component } from "react"
import { Table, Card, Button, Icon, message } from "antd"
import LinkButton from "../../components/link-button"
import { reqCategorys } from "../../api"

export default class Category extends Component {
  state = {
    loading: true, //是否正在获取数据中
    categorys: [], //一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: "0", //当前需要显示的分类列表的父分类ID
    parentName: "" // 当前需要显示的分类列表的父分类名称
  }

  // 初始或Table所有列的数据
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name" //显示数据对应的属性名
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          //返回需要显示的界面标签
          <span>
            <LinkButton>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传入数据 */}
            {this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>:null}
            
          </span>
        )
      }
    ]
  }

  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    this.setState({
      parentId:category._id,
      parentName:category.name
    },()=>{
      this.getCategorys()  //获取二级分类列表显示
    })
  }

  // 获取一级/二级分类列表
  getCategorys = async () => {
    const { parentId } = this.state
    const result = await reqCategorys(parentId)
    this.setState({ loading: false }) // 在请求完成后,隐藏loading
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === "0") {
        //一级
        this.setState({ categorys })
      } else {
        //二级
        this.setState({ subCategorys: categorys })
      }
    } else {
      message.error("获取列表失败")
    }
  }

  // 像是指定一级分类列表
  showCategorys = () => {
    this.setState({
      parentId:'0',
      parentName:'',
      subCategorys:[]  //二级列表也要清空
    })
  }

  // 为第一次render()准备数据
  componentWillMount() {
    this.initColumns()
  }

  // 执行异步任务:发异步ajax请求
  componentDidMount() {
    this.getCategorys() //获取一级/二级分类列表
  }

  render() {
    const { loading, categorys, parentId, subCategorys,parentName } = this.state

    // card的左侧
    const title = parentId==='0'?"一级分类列表":(
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{marginRight: 5}} />
        <span>{parentName}</span>
      </span>
    )

    // Card的右侧
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            dataSource={parentId === "0" ? categorys : subCategorys}
            columns={this.columns}
            bordered
            rowKey="_id"
            loading={loading}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />
        </Card>
      </div>
    )
  }
}
