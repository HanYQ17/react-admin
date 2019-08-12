import React, { Component } from "react"
import { Form, Input } from "antd"
import PropTypes from "prop-types" //类型检查

class AddForm extends Component {
  // 类型检测
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
        labelCol: { span: 4 }, //左侧label的宽度
        wrapperCol: { span: 15 } //右侧包裹的宽度
      }
    return (
      <Form {...formItemLayout}>
        <Form.Item label='角色名称'>
          {getFieldDecorator("roleName", {
            rules: [
              {required: true, message: '角色名称必须输入'}
            ]
          })(<Input placeholder='请输入角色名称' />)}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddForm)
