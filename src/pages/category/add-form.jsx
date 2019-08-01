import React, { Component } from "react"
import { Form, Select, Input } from "antd"

const { Option } = Select

class AddForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("parentId", {
            initialValue: "0" //初始值
          })(
            <Select>
              <Option value='0'>一级分类</Option>
              <Option value='1'>喜</Option>
              <Option value='2'>哈</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: "" //初始值
          })(<Input placeholder='请输入分类名称' />)}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddForm)
