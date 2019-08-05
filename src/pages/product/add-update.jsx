/**
 * Product的添加和更新的子路由组件
 */
import React, { Component } from "react"
import { Card, Icon, Form, Input, Cascader, Button } from "antd"
import LinkButton from "../../components/link-button"
const { TextArea } = Input

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
]
class AddUpdate extends Component {
  state = {
    options,
  }

  // 自定义验证
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback() //验证通过
    } else {
      callback("价格必须大于0") //验证没通过
    }
  }

  // 表单提交
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
      }
    })
  }

  // 级联选择器:加载下一级列表的回调函数
  loadData = selectedOptions => {
    const targetOption = selectedOptions[0] //数组的长度就是1,减1就是0
    targetOption.loading = true;

    // 模拟请求异步获取二级列表数据,并更新
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 }, //左侧label的宽度
      wrapperCol: { span: 8 } //右侧包裹的宽度
    }
    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            onClick={() => this.props.history.goBack()}
            style={{ marginRight: 10, fontSize: 20 }}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form>
          <Form.Item {...formItemLayout} label='商品名称: '>
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder='请输入商品名称' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品描述: '>
            {getFieldDecorator("desc", {
              initialValue: "",
              rules: [{ required: true, message: "请输入商品描述" }]
            })(<TextArea placeholder='请输入商品描述' autosize />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品价格: '>
            {getFieldDecorator("price", {
              initialValue: "",
              rules: [
                { required: true, message: "请输入商品价格" },
                { validator: this.validatePrice }
              ]
            })(
              <Input
                type='number'
                placeholder='请输入商品价格'
                addonAfter='元'
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品分类: '>
            {getFieldDecorator("categoryIds", {
              initialValue: "",
              rules: [{ required: true, message: "必须指定商品分类" }]
            })(
              <Cascader
                options={this.state.options}  /* 需要显示的列表数据数组 */
                loadData={this.loadData}  /* 当选择某个列表,加载下一级列表的监听回调 */
                placeholder='请指定商品分类'
              />
            )}
          </Form.Item>









          <Form.Item {...formItemLayout} label='商品图片: '>
            {getFieldDecorator("imgs", {
              initialValue: ""
            })(
            <span>商品图片</span>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品详情: '>
            {getFieldDecorator("detail", {
              initialValue: ""
            })(<span>商品详情</span>)}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Button onClick={this.submit} type='primary'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(AddUpdate)
