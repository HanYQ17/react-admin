import React, { Component } from "react"
import { Form, Input, Select } from "antd"
import PropTypes from "prop-types" //类型检查

const { Option } = Select

class AddForm extends Component {
  // 类型检测
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object,
    roles: PropTypes.array.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const { user, roles } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 }, //左侧label的宽度
      wrapperCol: { span: 15 } //右侧包裹的宽度
    }
    return (
      <Form {...formItemLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator("username", {
            initialValue: user.username
          })(<Input placeholder="请输入用户名" />)}
        </Form.Item>
        {user._id ? null : (
          <Form.Item label="密码">
            {getFieldDecorator("password", {
              initialValue: user.password
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
        )}

        <Form.Item label="手机号">
          {getFieldDecorator("phone", {
            initialValue: user.phone
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator("email", {
            initialValue: user.email
          })(<Input placeholder="请输入邮箱" />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator("role_id", {
            initialValue: user._id ? user.role_id : "请选择角色"
          })(
            <Select>
              {roles.map(role => (
                <Option value={role._id} key={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddForm)
