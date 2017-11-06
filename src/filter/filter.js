/**
 * Created by 陆飞 on 2017/10/13.
 */

//货币格式化 currencyType 货币符号
export const formatPrice = (value = '0', currencyType = '') => {
  let res;
  if (value.toString().indexOf('.') === -1) {
    res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.00'
  } else {
    let prev = value.toString().split('.')[0];
    let next = value.toString().split('.')[1] < 10 ? value.toString().split('.')[1] + '0' : value.toString().split('.')[1];
    res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next
  }
  return currencyType + res
}

//日期时间格式化 format 时间格式
export const formatDate = (time, format) => {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  let date = new Date(parseInt(time));

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let dt = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let key in dt) {
    if (new RegExp(`(${key})`).test(format)) {
      let str = dt[key] + ''
      format = format.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length)
      );
    }
  }

  return format;
}

//字母大写格式化
export const letterToUpperCase = (value = '') => {return value.toUpperCase()}

//字母小写格式化
export const letterToLowerCase = (value = '') => {return value.toLowerCase()}
