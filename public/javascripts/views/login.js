$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $(function () {
        $.ajax({
            method: "post",
            url: "/api/getUserInfo",
            success: function (res) {
                if (res.status === 0) {
                    window.location.assign('/dashboard');
                }
            }
        });
    });

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
            url: "/login",
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