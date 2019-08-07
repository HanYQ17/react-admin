/**
 * 转换时间格式 
 */

// 年-月-日
export function formatDate(d) {
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()

    month = month > 10 ? month : '0' + month
    day = day > 10 ? day : '0' + day

    return `${year}-${month}-${day}`
}

// 时:分
export function formatDateTimeTiny(d) {
    let h = d.getHours()
    let m = d.getMinutes()

    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m

    return h + ':' + m
}

// 年-月-日 时:分:秒
export function formatDateTime(d) {
    if (!d) return ''
    let date = new Date(d)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let seconds = date.getSeconds()

    month = month > 10 ? month : '0' + month
    day = day > 10 ? day : '0' + day
    hour = hour > 10 ? hour : '0' + hour
    minute = minute > 10 ? minute : '0' + minute
    seconds = seconds > 10 ? seconds : '0' + seconds

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}