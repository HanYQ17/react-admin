/**
 * 富文本编辑器
 * 下载依赖 : yarn add react-draft-wysiwyg draftjs-to-html
 */
import React, { Component } from "react"
import { EditorState, convertToRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
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
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    )
  }
}
