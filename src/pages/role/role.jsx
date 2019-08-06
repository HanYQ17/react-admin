/**
 * 角色路由
 */

import React, { Component } from "react"
import { Card, Button, Table, Modal, message } from "antd"
import { reqRoles, reqUpdateRole } from "../../api"
import AddForm from "./add-form"
import {PAGE_SIZE} from '../../utils/constants'

export default class Role extends Component {
  state = {
    roles: [], //所有角色列表
    role: {}, //选中的角色,对象
    isShowAdd: false // 是否显示添加界面
  }

  // 获取所有角色
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({ roles })
    }
  }

  // 弹框确认:添加角色
  addRole = () => {
    this.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {roleName} = values
        const result = await reqUpdateRole(roleName)
        if(result.status===0){
            this.setState({isShowAdd: false}) //关闭弹窗
            this.form.resetFields() //清除数据
            message.success('添加角色成功')  
            // 重新渲染:方法一
            // this.getRoles()

            // 重新渲染:方法二
            // 更新roles状态:基于原本状态数据更新
            const role = result.data
            this.setState((state,props)=>({
                roles:[...state.roles,role]
            }))
        }else{
            message.error('添加角色失败')
        }
      }
    })
  }

  // 弹框取消:隐藏弹框
  handleCancel = () => {
    this.form.resetFields() //1.清除输入数据 antd组件中form的方法
    this.setState({
      //2.隐藏弹框
      isShowAdd: false
    })
  }

  //   点击行
  onRow = role => {
    return {
      onClick: event => {
        this.setState({ role })
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

  componentDidMount() {
    this.getRoles() //获取所有角色
  }

  render() {
    const { roles, role, isShowAdd } = this.state
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        &nbsp;&nbsp;
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
          pagination={{  //分页
            defaultPageSize:PAGE_SIZE, //默认的每页条数
          }}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={form => { this.form = form }}
          />
        </Modal>
      </Card>
    )
  }
}
/*

this.setState(函数)  原始的写法
this.setState(对象)  简洁的写法

*/