/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 10:37:43
 * @LastEditTime: 2019-08-12 15:34:34
 * @LastEditors: Please set LastEditors
 */

/** 应用的根组件 */

import React, { Component } from 'react'
import PropTypes from "prop-types" //类型检查
import {increment,decrement} from './redux/reducer'

export default class App extends Component {
  
  static propTypes = {  // 类型检测
    store: PropTypes.object.isRequired //父组件传过来的store参数
  }
  
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  increment = () => {
    const number = this.numberRef.current.value *1
    this.props.store.dispatch(increment(number))
  }
  decrement = () => {
    const number = this.numberRef.current.value *1
    this.props.store.dispatch(decrement(number))
  }
  incrementIfOdd = () => {
    const number = this.numberRef.current.value *1
    if(this.props.store.getState() %2!==0){
      this.props.store.dispatch(increment(number))
    }
  }
  incrementAsync = () => {
    const number = this.numberRef.current.value *1
    setTimeout(()=>{
      this.props.store.dispatch(increment(number))
    },1000)
  }

  render() {
    const count = this.props.store.getState()  //从store中获取count的值
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

