function is_null(val) {
    if (val === null) {
        return val;
    }
    var str = val.replace(/(^\s*)|(\s*$)/g, '');
    return str === '' || str === undefined || str === null;
}

function checkmoney(money) {
    var pattern = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
    ;
    return pattern.test(money);
}