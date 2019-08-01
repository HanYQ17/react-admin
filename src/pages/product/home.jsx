/**
 * Product的默认子路由组件
 */

import React, { Component } from "react"
import { Card, Select, Input, Icon, Button, Table } from "antd"
import LinkButton from "../../components/link-button"
import { reqProducts } from "../../api"
import {PAGE_SIZE} from '../../utils/constants'  //一些常量

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    products: [], //商品数组
    total: 0 //总条数
  }

  // 初始化table的列的数组
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "$" + price //当前指定了对应的属性,传入的是对应的属性值
      },
      {
        width: 100,
        title: "状态",
        dataIndex: "status",
        render: () => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: "操作",
        render: () => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  //   获取商品分页列表
  getProducts = async pageNum => {
    this.pageNum = pageNum  // 保存pageNum, 让其它方法可以看到
    const result = await reqProducts(pageNum, PAGE_SIZE)
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({ total, products: list })
    }
  }

  componentWillMount() {
    this.initColumns() // 初始化table的列的数组
  }

  componentDidMount() {
    this.getProducts(1) //获取商品分页列表
  }

  render() {
    const { products,total } = this.state

    const title = (
      <span>
        <Select value='1' style={{ width: 150 }}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{ width: 150, margin: "0 15px" }} />
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus' />
        添加商品
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            rowKey='_id'
            dataSource={products}
            columns={this.columns}
            pagination={{  //分页
              current: this.pageNum,  //当前页数
              total,  //数据总数
              defaultPageSize:PAGE_SIZE, //默认的每页条数
              showQuickJumper:true,  //是否可以快速跳转至某页
              onChange:this.getProducts  //页码改变的回调，参数是改变后的页码及每页条数
            }}
          />
        </Card>
      </div>
    )
  }
}
