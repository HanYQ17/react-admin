/**
 * 角色路由
 */

import React, { Component } from "react"
import { Card, Button, Table } from "antd"
import { reqRoles } from "../../api"

export default class Role extends Component {
  state = {
    roles: [], //所有角色列表
    role: {},  //选中的角色,对象
  }

  // 获取所有角色
  getRoles = async () => {
    const result = await reqRoles()
    if(result.status===0){
        const roles = result.data
        this.setState({roles})
    }
  }

  onRow = role => {
    return {
      onClick: event => {  // 点击行
        this.setState({role})
      }
    }
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
        dataIndex: "create_time"
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
    this.initColumn() //table头部数据
  }

  componentDidMount(){
      this.getRoles() //获取所有角色
  }

  render() {
    const { roles, role } = this.state
    const title = (
      <span>
        <Button type="primary">创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id]
          }} /* 单选 */
          onRow={this.onRow} /* 点击行选中  提高用户体验 */
        />
      </Card>
    )
  }
}
