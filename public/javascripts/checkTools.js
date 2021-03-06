/**
 * @Description: 用户输入格式检查
 * @author Li Xi
 * @date 2019-03-15
*/

function is_null(val) {
    if (val === null) {
        return val;
    }
    var str = val.replace(/(^\s*)|(\s*$)/g, '');
    return str === '' || str === undefined || str === null;
}

function checkmoney(money) {
    var pattern = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
    return pattern.test(money);
}

function checkPhone(phone) {
    var pattern = /^1[0-9]{10}$/;
    return pattern.test(phone);
}

function checkLength(input) {
    return input.length >= 50;
}