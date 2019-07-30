import axios from 'axios'  //yarn add axios
import { message } from 'antd';

export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {  // 使用Promise可以统一处理出错
        let promise
        if (type === 'GET') {
            promise = axios.get(url, { params: data })
        } else {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error(error.msg)
        })
    })
}










