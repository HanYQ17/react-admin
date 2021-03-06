import ajax from './ajax'
import jsonp from 'jsonp'  //npm install jsonp (github上搜用法)
import { message } from 'antd'

const BASE = ''

// 01_登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 02_添加/修改用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/'+(user._id?'update':'add'), user, 'POST')

// 04_获取所有用户列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

// 05_删除用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete',{userId},'POST')

// 06_获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

// 07_添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')

// 08_修改品类名称
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

// 09_根据分类ID获取分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })

// 10_获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

// 11_根据ID/Name搜索产品分页列表
// searchType: 搜索的类型,productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize,searchName,searchType}) => ajax(BASE + '/manage/product/search', { 
    pageNum, 
    pageSize,
    [searchType]:searchName
 }, 'GET')

// 12_添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')
// 13_更新商品
// export const reqUpdateProduct = (product) => ajax(BASE+'/manage/product/update',product,'POST')

//  14_对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status) => ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')

// 16_删除图片
export const reqDeleteImg = (name) => ajax(BASE+'/manage/img/delete',{name},'POST')

// 17_添加角色
export const reqAddRole = (roleName) => ajax(BASE+'/manage/role/add',{roleName},'POST')

// 18_获取角色列表
export const reqRoles = () => ajax(BASE+'/manage/role/list')

// 19_更新角色(给角色设置权限)
export const reqUpdateRole = (role) => ajax(BASE+'/manage/role/update',role,'POST')

// 20_获取天气信息
export const reqWeather = city => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {  //发送jsonp请求
            // console.log('jsonp()',err,data)
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]  //取出需要的数据
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败!')
            }
        })
    })
}
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */