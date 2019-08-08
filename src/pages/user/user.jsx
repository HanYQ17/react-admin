/**
 * 用户路由
 */

import React, { Component } from "react"
import { Card, Button, Table, Modal, message } from "antd"
import LinkButton from "../../components/link-button"
import { reqUsers, reqDeleteUser } from "../../api"
import { formatDateTime } from "../../utils/dateUtils"
import { PAGE_SIZE } from "../../utils/constants"
import UserForm from "./user-form"

const { confirm } = Modal

export default class User extends Component {
  state = {
    users: [], // 所有用户列表
    roles: [], // 所有角色列表
    isShow: false // 是否显示确认框
  }

  //   table的标题
  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: formatDateTime
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        // render:(role_id)=>this.state.roles.find(role => role._id === role_id).name  //方法一
        render: role_id => this.roleNames[role_id] //方法二
      },
      {
        title: "操作",
        render: user => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }

  //  根据role的数组,生成包含所有角色名的对象(属性名用角色id值)
  initRoleNames = roles => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleNames = roleNames //保存起来
  }

  //   获取用户列表
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({ users, roles })
    }
  }

  // 添加/修改用户
  addOrUpdateUser = () => {}

  //   删除用户
  deleteUser = async user => {
    confirm({
      title: `确定删除${user.username}用户吗`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success("删除成功")
          this.getUsers() //重新渲染
        } else {
          message.error("删除失败")
        }
      }
    })
  }

  //   显示添加界面
  showAdd = () => {
    this.user = null
    this.setState({ isShow: true })
  }

  //   显示修改界面
  showUpdate = user => {
    this.user = user
    this.setState({ isShow: true })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { users, isShow } = this.state
    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    )

    return (
      <Card title={title}>
        <Table
          border
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE
          }}
        />

        <Modal
          title="添加用户"
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false })
          }}
        >
          <UserForm />
          />
        </Modal>
      </Card>
    )
  }
}
