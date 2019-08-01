import React, { Component } from "react"
import { Form, Select, Input } from "antd"
// import PropTypes from "prop-types" //类型检查

const { Option } = Select

class AddForm extends Component {
  // // 类型检测
  // static PropTypes = {
  //   categorys: PropTypes.array.isRequired
  //   setForm: PropTypes.func.isRequired
  // }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { categorys,parentId } = this.props  //父组件传来的值
    
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("parentId", {
            initialValue: parentId //初始值
          })(
            <Select>
              <Option value='0'>一级分类</Option>
              {
                categorys.map((v)=>(
                  <Option value={v._id} key={v._id}>{v.name}</Option>
                ))
              }
              
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
