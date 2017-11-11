/**
 * Created by 陆飞 on 2017/11/09.
 */

export const isValEmpty = (value) => { //判断是否为空
    return value == '' ? true : false;
  }

export const regPhone = (phone) => { //判断手机号是否合法
  return !/^1[34578]\d{9}$/.test(phone);
}

export const isValueUndefinedv = (value,inputValue) => { //判断是不是undefined
  return value == undefined || value == 'undefined' ? inputValue : value;
}

export const regCarId = (cardId) => { //判断身份证是否合法
  return !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(cardId);
}

export const regEmail = (email) => { //判断邮件是否合法
  return !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}
