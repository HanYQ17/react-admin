/**
 * Product的详情子路由组件
 */

import React, { Component } from "react"
import { Card, List, Icon } from "antd"
import LinkButton from "../../components/link-button"
import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'

export default class ProductDetail extends Component {
    state={
        cName1:'', //一级分类名称
        cName2:'', //二级分类名称
    }
    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state.product
        console.log(categoryId)
        if(pCategoryId==='0'){  //一级分类下的商品
            const result = await reqCategory(categoryId)
            console.log(result)
            const cName1 = result.data.name
            this.setState({cName1})
        }else{  //二级分类下的商品
            //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
            // const result1 = await reqCategory(pCategoryId)
            // const result2 = await reqCategory(categoryId)
            // const cName1 = result1.data.name
            // const cName2 = result2.data.name

            // 一次性发送多个请求,只有都成功了才正常处理
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({cName1,cName2})
        }
    }
  render() {
      const {name,imgs,price,desc,detail} = this.props.location.state.product  //读取携带过来的state数据
      const {cName1,cName2} = this.state
      
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left'
           onClick={()=>this.props.history.goBack()}
           style={{ marginRight: 10, fontSize: 20 }} />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <div>
        <Card title={title} className='product-detail'>
          <List>
            <List.Item>
              <span className='left'>商品名称:</span>
              <span>{name}</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品描述:</span>
              <span>{desc}</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品价格:</span>
              <span>{price}元</span>
            </List.Item>
            <List.Item>
              <span className='left'>所属分类:</span>
              <span>{cName1} {cName2 ? ' ---> '+ cName2:null}</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品图片:</span>
              {
                  imgs.map(item=>(
                    <img className='product-img' src={BASE_IMG_URL+item} key={item} className="product-img" alt="img" />
                  ))
              }
            </List.Item>
            <List.Item>
              <span className='left'>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html: detail}}></span>
            </List.Item>
          </List>
        </Card>
      </div>
    )
  }
}
