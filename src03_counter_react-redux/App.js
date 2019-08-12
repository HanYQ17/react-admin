/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 10:37:43
 * @LastEditTime: 2019-08-12 16:56:20
 * @LastEditors: Please set LastEditors
 */

/** 应用的根组件 */

import React, { Component } from 'react'
import PropTypes from "prop-types" //类型检查

import {connect} from 'react-redux' //npm install --save react-redux
import {increment,decrement} from './redux/reducer'

class App extends Component {
  
  static propTypes = {  // 类型检测
    count: PropTypes.number.isRequired, //父组件传过来的参数
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  increment = () => {
    const number = this.numberRef.current.value *1
    this.props.increment(number)
  }
  decrement = () => {
    const number = this.numberRef.current.value *1
    this.props.decrement(number)
  }
  incrementIfOdd = () => {
    const number = this.numberRef.current.value *1
    if(this.props.count %2!==0){
      this.props.increment(number)
    }
  }
  incrementAsync = () => {
    const number = this.numberRef.current.value *1
    setTimeout(()=>{
      this.props.increment(number)
    },1000)
  }

  render() {
    const count = this.props.count  //父组件传来的store参数
    return (
      <div>
        <p>click {count} times</p>

        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    )
  }
}

// 使用react-redux中的connect属性,把值传给子组件App
export default connect(
  state => ({count:state}),
  {increment,decrement}
)(App)