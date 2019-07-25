import React, { Component } from "react"
import "./login.less"
import logo from "./images/logo.png"
import { Form, Icon, Input, Button, message } from "antd" //yarn add antd
import { reqLogin } from "../../api/index"
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtils"
import { Redirect } from "react-router-dom"

class Login extends Component {
  // 表单提交
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      //表单验证
      if (!err) {
        const { username, password } = values
        const result = await reqLogin(username, password) //发请求登录
        if (result.status === 0) {
          //登录成功

          const user = result.data
          storageUtils.saveUser(user) //保存到localStorage
          memoryUtils.user = user //保存到memoryUtils

          message.success("登录成功")
          this.props.history.replace("/") //不需要回退到登录页,不用push,用replace
        } else {
          //登录失败
          message.error(result.msg)
        }
      } else {
        console.log("验证失败")
      }
    })
  }

  // 密码自定义验证
  validatePwd = (rule, value, callback) => {
    // callback() // 没有传参代表验证通过
    // callback('XXX') // 传参了代表验证失败,并指定提示的文本
    if (!value) {
      callback("密码必须输入")
    } else if (value.length < 4) {
      callback("密码长度不能小于4位")
    } else if (value.length > 12) {
      callback("密码长度不能大于12位")
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是英文、数字或下划线组成")
    } else {
      callback() //验证通过
    }
  }

  render() {

    // 判断用户是否登录,登录了就不在跳转到登录页
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/' />
    }

    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required: true, message: "请输入用户名" },
                    { max: 12, message: "必须小于等于 12 位" },
                    { min: 4, message: "必须大于等于 4 位" },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message: "必须是英文、数字或下划线组成"
                    }
                  ],
                  initialValue: "admin" // 初始值
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  // 自定义验证
                  rules: [{ validator: this.validatePwd }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    )
  }
}
export default Form.create()(Login)

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()() 表单验证
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */

/*

收集表单数据和表单的前台验证
1). form对象
    如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
    WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
    用到了高阶函数和高阶组件的技术
2). 操作表单数据
    form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项组件标签
    form.getFieldsValue(): 得到包含所有输入数据的对象
    form.getFieldValue(id): 根据标识得到对应字段输入的数据

3). 前台表单验证
    a. 声明式实时表单验证:
        form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
    b. 自定义表单验证
        form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
        validatePwd = (rule, value, callback) => {
          if(有问题) callback('错误提示信息') else callack()
        } 
    c. 点击提示时统一验证
        form.validateFields((error, values) => {
          if(!error) {通过了验证, 发送ajax请求}
        })
*/
