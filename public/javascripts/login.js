/**
 * @Description: 对应login pug
 * @author Li Xi
 * @date 2019-03-15
 */

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-login').click(function () {

        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();

        if (is_null(phone)) {
            alert('请输入电话号码！');
            return;
        }
        if (is_null(password)) {
            alert('请输入密码');
            return;
        }
        if (checkPhone(phone) === false) {
            alert('请输入有效电话号码');
            return;
        }

        $.ajax({
            method: "post",
            url: "/user/login",
            data: {phone: phone, password: password},
            success: function (res) {
                if (res.status === 0) {
                    window.location.assign('/dashboard');
                } else if (res.status === 1) {
                    alert(res.message);
                }
            }
        });
    });
});