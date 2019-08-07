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

  //tree数据展示
  treeNodes = (menuList) => {
      return menuList.reduce((pre,item)=>{
        pre.push(
            <TreeNode title={item.title} key={item.key}>
                { item.children ? this.treeNodes(item.children) : null }  
            </TreeNode>
        )
        return pre
    },[])
  }

  componentWillMount() {
    this.treeNodes = this.treeNodes(menuList)
  }

  render() {
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
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
