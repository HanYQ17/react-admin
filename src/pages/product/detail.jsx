/**
 * Product的详情子路由组件
 */

import React, { Component } from "react"
import { Card, List, Icon } from "antd"
import LinkButton from "../../components/link-button"

export default class ProductDetail extends Component {
  render() {
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ marginRight: 10, fontSize: 20 }} />
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
              <span>联想</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品描述:</span>
              <span>年度重量级新品,轻薄机身设计</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品价格:</span>
              <span>9999元</span>
            </List.Item>
            <List.Item>
              <span className='left'>所属分类:</span>
              <span>喜 ---> 二级分列表</span>
            </List.Item>
            <List.Item>
              <span className='left'>商品图片:</span>
              <img className='product-img' src="http://localhost:5000/upload/image-1564647343509.jpg" className="product-img" alt="img" />
              <img className='product-img' src="http://localhost:5000/upload/image-1564647343509.jpg" className="product-img" alt="img" />
            </List.Item>
            <List.Item>
              <span className='left'>商品详情:</span>
              <span>这是一台电脑</span>
            </List.Item>
          </List>
        </Card>
      </div>
    )
  }
}
