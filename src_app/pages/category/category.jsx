/**
 * 商品分类路由
 */

import React, { Component } from "react"
import { Table, Card, Button, Icon, message, Modal } from "antd"
import LinkButton from "../../components/link-button"
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../api"
import AddForm from "./add-form"
import UpdateForm from "./update-form"

export default class Category extends Component {
  state = {
    loading: true, //是否正在获取数据中
    categorys: [], //一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: "0", //当前需要显示的分类列表的父分类ID
    parentName: "", // 当前需要显示的分类列表的父分类名称
    showStatus: 0 //标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }

  // 初始或Table所有列的数据
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name" //显示数据对应的属性名
      },
      {
        title: "操作",
        width: 300,
        render: category => (
          //返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {/* 如何向事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传入数据 */}
            {this.state.parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ]
  }

  // 显示指定一级分类对象的二级列表
  showSubCategorys = category => {
    console.log(category)
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        this.getCategorys() //获取二级分类列表显示
      }
    )
  }

  // 获取一级/二级分类列表
  // parentId:如果没有指定根据状态中的parentId请求,如果指定了根据指定的请求
  getCategorys = async (parentId) => {
    // const { parentId } = this.state
    parentId  = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({ loading: false }) // 在请求完成后,隐藏loading
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === "0") {
        //一级
        this.setState({ categorys })
      } else {
        //二级
        this.setState({ subCategorys: categorys })
      }
    } else {
      message.error("获取列表失败")
    }
  }

  // 显示指定一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [] //二级列表也要清空
    })
  }

  // 显示添加的弹框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示修改的弹框
  showUpdate = category => {
    this.category = category //保存分类对象
    this.setState({
      //更新状态
      showStatus: 2
    })
  }

  // 弹框取消:隐藏弹框
  handleCancel = () => {
    this.form.resetFields() //1.清除输入数据 antd组件中form的方法
    this.setState({
      //2.隐藏弹框
      showStatus: 0
    })
  }

  // 添加分类
  addCategory = () => {
    /**
     * 1.隐藏确定框
     * 2.收集数据并发请求添加分类
     * 3.重新渲染页表
     */
    this.form.validateFields(async (err,value) => {
      if (!err) {
        // 1.隐藏确定框
        this.setState({showStatus:0})
        // 2.收集数据并发请求添加分类
        // const {categoryName,parentId} = this.form.getFieldsValue()
        const {categoryName,parentId} = value
        this.form.resetFields() //清除输入数据,拿到值之后再清除
        const result = await reqAddCategory(parentId,categoryName)
        if(result.status===0){
          if(parentId===this.state.parentId){  //果然是当前的父元素添加才需渲染,不是添加当前分类不需要渲染
            // 3.重新渲染页表
            this.getCategorys()
          }else if(parentId==='0'){ //在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
            // this.setState({parentId:'0'},()=>{ this.getCategorys() })  //这样会返回一级列表,现在的需求是不显示一级列表
            this.getCategorys('0')  //getCategorys添加一个参数
          }
        }
      }
    })
  }

  // 修改品类名称
  updateCategory = () => {
    /**
     * 1.隐藏确定框
     * 2.发请求修改分类
     * 3.重新渲染页表
     */
    this.form.validateFields(async (err,value) => {
      if (!err) {
        // 1.隐藏确定框
        this.setState({ showStatus: 0 })
        // 2.发请求修改分类
        const categoryId = this.category._id
        // const categoryName = this.form.getFieldValue("categoryName") //拿到子组件的form值
        const {categoryName} = value //拿到子组件的form值
        this.form.resetFields() //清除输入数据 antd组件中form的方法
        const result = await reqUpdateCategory(categoryId, categoryName)
        if (result.status === 0) {
          // 3.重新渲染页表
          this.getCategorys()
        } else {
          message.error("修改失败")
        }
      }
    })
  }

  // 为第一次render()准备数据
  componentWillMount() {
    this.initColumns()
  }

  // 执行异步任务:发异步ajax请求
  componentDidMount() {
    this.getCategorys() //获取一级/二级分类列表
  }

  render() {
    const {
      loading,
      categorys,
      parentId,
      subCategorys,
      parentName,
      showStatus
    } = this.state

    //  读取指定的分类
    const category = this.category || {} // 如果还没有就指定一个空对象,防止报错

    // card的左侧
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type='arrow-right' style={{ marginRight: 5 }} />
          <span>{parentName}</span>
        </span>
      )

    // Card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus' />
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            dataSource={parentId === "0" ? categorys : subCategorys}
            columns={this.columns}
            bordered
            rowKey='_id'
            loading={loading}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />

          <Modal
            title='添加分类'
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm 
              categorys={categorys}  //传 '一级分类列表' 到子组件
              parentId={parentId} //同上
              setForm={form=>{this.form=form}} //子组件传过来的值
            />
          </Modal>

          <Modal
            title='修改分类'
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm
              categoryName={category.name}
              setForm={form => {
                this.form = form
              }}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
