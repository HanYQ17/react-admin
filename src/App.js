/** 应用的根组件 */

import React, { Component } from 'react'
import { Button,message } from 'antd'

const info = () => {
  message.info('提示');
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary" onClick={info}>测试antd</Button>
      </div>
    )
  }
}

