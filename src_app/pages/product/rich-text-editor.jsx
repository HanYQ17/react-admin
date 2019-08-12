/**
 * 富文本编辑器
 * 下载依赖 : yarn add react-draft-wysiwyg draftjs-to-html
 */
import React, { Component } from "react"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import PropTypes from "prop-types"

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty() // 创建一个没有内容的编辑对象
  }

  //   显示已有的数据,即'修改'进来是有详情信息的
  constructor(props) {
    super(props)
    const html = this.props.detail //接受父组件传过来的detail,放到富文本里,还需进行判断
    if (html) {
      //有值
      const contentBlock = htmlToDraft(html)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        )
        const editorState = EditorState.createWithContent(contentState)
        this.state = {
          editorState
        }
      }
    } else {
      //没值
      this.state = {
        editorState: EditorState.createEmpty() // 创建一个没有内容的编辑对象
      }
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })
  }

  //   数据对应的html格式的文本(传给父组件调用)
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  // 图片上传
  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/manage/img/upload")
      // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');  //不用设置请求头
      const data = new FormData()
      data.append("image", file)
      xhr.send(data)
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText) 
        const url = response.data.url  //得到图片地址url 
        resolve({data: {link: url}})
      })
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{
            border: "1px solid black",
            minHeight: 200,
            paddingLeft: 10
          }}
          onEditorStateChange={this.onEditorStateChange}
          /* 图片上传 */
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    )
  }
}
