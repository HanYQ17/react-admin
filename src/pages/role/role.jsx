/**
 * 角色路由
 */

import React, { Component } from "react"
import { Card, Button, Table } from "antd"

export default class Role extends Component {
  state = {
    roles: [
      {
        _id: "5d4930ff4b080425a8d19239",
        name: "a",
        create_time: 1565077759349,
        __v: 0,
        auth_name: "admin",
        auth_time: 1565077772767
      },
      {
        menus: [],
        _id: "5d4938e44b080425a8d1923b",
        name: "b",
        create_time: 1565079780849,
        __v: 0
      }
    ]
  }

  onRow=(event)=>{
    return {
        onClick: event => {
            console.log('点击行',event)
        }, // 点击行
        onDoubleClick: event => {},
        onContextMenu: event => {},
        onMouseEnter: event => {}, // 鼠标移入行
        onMouseLeave: event => {},
      };
  }

//   table表格的标题数据
  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        // render:(time)=>(
        //     // formatDateTime(time)
        // )
      },
      {
        title: "授权时间",
        dataIndex: "auth_time"
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      }
    ]
  }

  componentWillMount() {
    this.initColumn()
  }

  render() {
    const { roles } = this.state
    const title = (
      <span>
        <Button type="primary">创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" disabled={false}>
          设置角色权限
        </Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          rowSelection={{ type: "radio" }}  /* 单选 */
          onRow={this.onRow}  /* 点击行选中  提高用户体验 */
        />
      </Card>
    )
  }
}
