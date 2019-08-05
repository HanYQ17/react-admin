import React, { Component } from "react"
import { Upload, Icon, Modal, message } from 'antd'
import {reqDeleteImg} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false, //是否显示大图预览
    previewImage: '', //大图的url
    fileList: [
    //   {
    //     uid: '-1',  // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    //     name: 'image.png',  // 文件名
    //     status: 'done',  // 图片状态: done:已上传, uploading:正在上传中, removed:已删除
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   }
    ]
  }

  handleCancel = () => this.setState({ previewVisible: false });
    // 显示指定的大图
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,  //没有上传成功有个默认显示file.preview
      previewVisible: true,
    })
  }

/**
 * file: 当前操作的图片文件(上传或删除的时候有用)
 * fileList: 所有已上传图片文件对象的数组
 */
  handleChange = async ({ file,fileList }) => {
      console.log(file)
    //   console.log('handleChange()', file.status, fileList.length, file===fileList[fileList.length-1])

    // 一旦上传成功,将当前上传的file的信息修正(name,url)
    if(file.status==='done'){
        const result = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
        if(result.status===0){
            message.success('上传图片成功')
            const {name,url} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url
        }else{
            message.error('上传图片失败')
        }
    }else if(file.status==='removed'){
        const result = await reqDeleteImg(file.name)
        if(result.status===0){
            message.success('删除图片成功')
        }else{
            message.error('删除图片失败')
        }
    }
    
    // 在操作(上传/删除)过程中更新fileList状态
    this.setState({ fileList })  
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"  /* 上传文件的地址 接口文档 */
          accept="image/*"  /*只接收图片格式*/
          listType="picture-card" /*上传之后的显示方式*/
          name="image"  /* 请求参数名称 接口文档 */
          fileList={fileList}  /* 所有已上传图片文件对象的数组 */
          onPreview={this.handlePreview}  /* 大图预览 */
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
