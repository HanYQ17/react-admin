/**
 * Product的详情子路由组件
 */

import React, { Component } from "react"
import { Card, List, Icon } from "antd"
import LinkButton from "../../components/link-button"
import {BASE_IMG_URL} from '../../utils/constants'

export default class ProductDetail extends Component {
  render() {
      const {name,imgs,price,desc,detail} = this.props.location.state.product  //读取携带过来的state数据
      
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
              <span>喜 ---> 二级分列表</span>
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
