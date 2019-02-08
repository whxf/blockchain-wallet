function is_null(val) {
    var str = val.replace(/(^\s*)|(\s*$)/g, '');
    return str === '' || str === undefined || str === null;
}

function checkmoney(money) {
    var pattern = /^\d+(\.\d{1,2})?$/;
    return pattern.test(money);
}