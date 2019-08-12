import React, { Component } from "react"
import { Form, Input, Tree } from "antd"
import PropTypes from "prop-types" //类型检查
import menuList from "../../config/menuConfig" //左侧菜单数据

const { TreeNode } = Tree

export default class AuthForm extends Component {
  // 类型检测
  static propTypes = {
    role: PropTypes.object //父组件传过来的role参数
  }

  //父组件传过来的role参数,state需要用到父组件时要使用constructor
  constructor(props) {
    super(props)
    const { menus } = this.props.role 
    this.state = {
      checkedKeys: menus
    }
  }

  // 为父组件提交获取最新menus数据的方法
  getMenus = () => this.state.checkedKeys

  // 选中某个node时的回调
  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys)
    this.setState({ checkedKeys })
  }

  //tree数据展示
  treeNodes = menuList => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.treeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  componentWillMount() {
    this.treeNodes = this.treeNodes(menuList)
  }

  // 根据新传入的role来更新checkedKeys状态 (解决'确认/取消'不重新赋值的bug)
  // 当组件接受到新的属性时自动调用
  componentWillReceiveProps(nextProps){
    const menus = nextProps.role.menus
    this.setState({checkedKeys:menus})
  }

  render() {
    const { checkedKeys } = this.state
    const { role } = this.props
    const formItemLayout = {
      labelCol: { span: 4 }, //左侧label的宽度
      wrapperCol: { span: 15 } //右侧包裹的宽度
    }
    return (
      <div>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled />
        </Form.Item>

        <Tree
          checkable
          defaultExpandAll //默认展开所有树节点
          checkedKeys={checkedKeys} //设置初始值
          onCheck={this.onCheck}  //选中某个node时的回调
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
