import React, { Component } from "react"
import { Form, Input } from "antd"
// import PropTypes from "prop-types" //类型检查

class UpdateForm extends Component {
  // // 类型检测
  // static PropTypes = {
  //   categoryName: PropTypes.string.isRequired
  //   setForm: PropTypes.func.isRequired
  // }

  // render()之前调用一次
  componentWillMount(){
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { categoryName } = this.props
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName //初始值
          })(<Input placeholder='请输入分类名称' />)}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(UpdateForm)
