/**
 * Product的添加和更新的子路由组件
 */
import React, { Component } from "react"
import { Card, Icon, Form, Input, Cascader, Button } from "antd"
import LinkButton from "../../components/link-button"
import { reqCategorys } from "../../api"
import PicturesWall from './pictures-wall'

const { TextArea } = Input

class AddUpdate extends Component {
  state = {
    options: []
  }

  constructor(props) {
    super(props);
    this.pw = React.createRef();
  }

  // 根据获取到的数据生成options(级联列表)
  initOptions = async categorys => {
    const options = categorys.map(c => ({ //根据参数遍历生成options数组
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    
    // 如果是一个二级分类商品的更新
    const {isUpdate,product} = this
    const {pCategoryId,categoryId} = product  //拿到分类ID
    if(isUpdate && pCategoryId !== '0'){
      const subCategorys = await this.getCategorys(pCategoryId)  //获取对应的二级分类列表
      const childOptions = subCategorys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      const targetOption = options.find(option=>option.value===pCategoryId) //找到当前商品对应的一级option对象
      targetOption.children = childOptions //关联到当前的option上
    }

    this.setState({ options }) 
  }

  // 获取一级/二级分类列表
  getCategorys = async parentId => {
    const result = await reqCategorys(parentId)
    // debugger  //打断点
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === "0") { //如果是一级分类列表
        this.initOptions(categorys) //根据获取到的数据生成options(级联列表)
      } else { //二级分类列表
        return categorys // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
      }
    }
  }

  // 级联选择器:加载下一级列表的回调函数
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0] //数组的长度就是1,减1就是0
    targetOption.loading = true

    // 根据选中的分类,请求获取二级分类的列表
    const subCategorys = await this.getCategorys(targetOption.value) //必须加上 async await
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) { //有二级分类
      const childOptions = subCategorys.map(c=>({  //生成一个二级列表的options
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions //关联到当前的option上
    } else {  //当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }

    this.setState({
      options: [...this.state.options]
    })
  }

  // 自定义验证
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback() //验证通过
    } else {
      callback("价格必须大于0") //验证没通过
    }
  }

  // 表单提交
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values)
        const node = this.pw.current.getImgs()  //调用子组件的方法
        console.log(node)
      }
    })
  }

  // 会在render()调用前之前一次
  componentWillMount(){
    const product = this.props.location.state //如果是'添加'就没值,是修改才有值
    this.isUpdate = !!product  //转换成布尔类型
    this.product = product || {}  //保存商品,如果没有值,就给空对象,才不会报错  //'添加商品'是没有值的
  }

  componentDidMount() {
    this.getCategorys("0")
  }

  render() {
    const {isUpdate,product} = this
    const {pCategoryId,categoryId} = product  //拿到分类ID
    const categoryIds = []  //用来接收级联分类ID的数组
    if(isUpdate){
      if(pCategoryId==='0'){  //一级分类只有一个分类ID
        categoryIds.push(categoryId)
      }else{   //二级分类有两个分类ID
        categoryIds.push(pCategoryId) 
        categoryIds.push(categoryId)
      }
    }

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 }, //左侧label的宽度
      wrapperCol: { span: 8 } //右侧包裹的宽度
    }
    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            onClick={() => this.props.history.goBack()}
            style={{ marginRight: 10, fontSize: 20 }}
          />
        </LinkButton>
        <span>{isUpdate?'修改商品':'添加商品'}</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form>
          <Form.Item {...formItemLayout} label='商品名称: '>
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder='请输入商品名称' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品描述: '>
            {getFieldDecorator("desc", {
              initialValue: product.desc,
              rules: [{ required: true, message: "请输入商品描述" }]
            })(<TextArea placeholder='请输入商品描述' autosize />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品价格: '>
            {getFieldDecorator("price", {
              initialValue: product.price,
              rules: [
                { required: true, message: "请输入商品价格" },
                { validator: this.validatePrice }
              ]
            })(
              <Input
                type='number'
                placeholder='请输入商品价格'
                addonAfter='元'
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品分类: '>
            {getFieldDecorator("categoryIds", {
              initialValue: categoryIds,
              rules: [{ required: true, message: "必须指定商品分类" }]
            })(
              <Cascader
                options={this.state.options} /* 需要显示的列表数据数组 */
                loadData={this.loadData} /* 当选择某个列表,加载下一级列表的监听回调 */
                placeholder='请指定商品分类'
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='商品图片: '>
            {getFieldDecorator("imgs", {
              initialValue: ""
            })(
            <PicturesWall ref={this.pw} /> /* 商品图片组件 */
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='商品详情: '>
            {getFieldDecorator("detail", {
              initialValue: ""
            })(<span>商品详情</span>)}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Button onClick={this.submit} type='primary'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(AddUpdate)
