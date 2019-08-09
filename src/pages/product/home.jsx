/**
 * Product的默认子路由组件
 */

import React, { Component } from "react"
import { Card, Select, Input, Icon, Button, Table, message } from "antd"
import LinkButton from "../../components/link-button"
import { reqProducts,reqSearchProducts,reqUpdateStatus } from "../../api"
import {PAGE_SIZE} from '../../utils/constants'  //一些常量

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    loading:true, //是否正在加载中
    products: [], //商品数组
    total: 0, //总条数
    searchName:'', //搜索的关键字
    searchType:'productName', //根据哪个字段搜索
  }

  // 初始化table的列的数组
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "$" + price //当前指定了对应的属性,传入的是对应的属性值
      },
      {
        width: 100,
        title: "状态",
        // dataIndex: "status", //不能写这个
        render: (product) => {
          const {status,_id} = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button onClick={()=>this.updateStatus(_id,newStatus)} type='primary'>{status===1?'下架':'上架'}</Button>
              <span>{status===1?'在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: "操作",
        render: (product) => (
          <span>
            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
            <LinkButton onClick={()=>this.props.history.push('/product/AddUpdate',product)}>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  //   获取商品分页列表
  getProducts = async (pageNum) => {
    this.pageNum = pageNum  // 保存pageNum, 让其它方法可以看到

    const {searchName,searchType} = this.state
    let result
    if(searchName){  //如果搜索关键字有值,说明我们要做搜索分页
      result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    }else{  //一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    this.setState({loading:false})
    if (result.status === 0) {
      const { total, list } = result.data  // 取出分页数据,更新状态,显示分页列表
      this.setState({ total, products: list })
    }
  }

  // 更新商品状态(上架/下架)
  updateStatus = async (productId,status)=>{
    const result = await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }


  componentWillMount() {
    this.initColumns() // 初始化table的列的数组
  }

  componentDidMount() {
    this.getProducts(1) //获取商品分页列表
  }

  render() {
    const { loading,products,total,searchName,searchType } = this.state

    const title = (
      <span>
        <Select 
          value={searchType} 
          onChange={value=>this.setState({searchType:value})} 
          style={{ width: 150 }}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' 
          value={searchName} 
          onChange={e=>this.setState({searchName:e.target.value})} 
          style={{ width: 150, margin: "0 15px" }} />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/AddUpdate')}>
        <Icon type='plus' />
        添加商品
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            rowKey='_id'
            dataSource={products}
            columns={this.columns}
            pagination={{  //分页
              current: this.pageNum,  //当前页数(必须设置:搜索时才会返回第一页)
              total,  //数据总数
              defaultPageSize:PAGE_SIZE, //默认的每页条数
              showQuickJumper:true,  //是否可以快速跳转至某页
              onChange:this.getProducts  //页码改变的回调，参数是改变后的页码及每页条数
            }}
          />
        </Card>
      </div>
    )
  }
}
