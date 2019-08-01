/**
 * Product的默认子路由组件
 */

import React, { Component } from "react"
import { Card, Select, Input, Icon, Button, Table } from "antd"
import LinkButton from "../../components/link-button"

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    products: [
      {
        status: 1,
        imgs: ["image-1564647343509.jpg"],
        _id: "5d429fc094afb21ab09878ed",
        name: "联想",
        desc: "一台电脑",
        price: 9999,
        detail: "<p>这是一个寂寞的天,下着有些伤心的雨</p>\n",
        pCategoryId: "5d4011ed0f7a3b2aa8bca4f5",
        categoryId: "5d41149318cdf808780179e3",
        __v: 0
      },
      {
        status: 1,
        imgs: ["image-1564647471496.jpg"],
        _id: "5d42a04994afb21ab09878ee",
        name: "海尔",
        desc: "洗衣机",
        price: 6666,
        detail: "<p>疯狂动物城里的兔子当上了警察</p>\n",
        pCategoryId: "5d4011ed0f7a3b2aa8bca4f5",
        categoryId: "5d412e6a18cdf808780179e4",
        __v: 0
      }
    ] //商品数组
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

  componentWillMount() {
    this.initColumns()
  }

  render() {
    const { products } = this.state

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
          />
        </Card>
      </div>
    )
  }
}
