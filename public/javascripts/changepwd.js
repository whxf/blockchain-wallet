$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {

    $('#send-message').click(function () {
        var phone = $("input[name='phone']").val();

        if (is_null(phone)) {
            alert('请输入电话号码');
            return;
        }
        if (checkPhone(phone) === false) {
            alert('请输入有效电话号码');
            return;
        }
        $.ajax({
            method: "post",
            url: "/message/sendMessage",
            data: {phone: phone},
            success: function (res) {
                if (res.status === 1) {
                    alert(res.message);
                    window.location.assign('/register');
                } else {
                    alert(res.message);
                }
            }
        });
    });

    $('#button-confirm-change-password').click(function () {
        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();
        var confirm_password = $("input[name='confirm-password']").val();
        var verif_code = $("input[name='code']").val();


        if (is_null(password)) {
            alert('请输入密码');
            return;
        }
        if (is_null(confirm_password)) {
            alert('请确认密码');
            return;
        }

        if (password !== confirm_password) {
            alert('密码不同，请重新输入密码');
            password = '';
            confirm_password = '';
            return;
        }

        var code;
        $.ajax({
            method: "post",
            url: "/api/getVerificationCode",
            success: function (res) {
                if (res.status === 1) {
                    alert(res.message);
                    window.location.assign('/register');
                    return
                }
                code = res.data;

                if (code.toString() === verif_code.toString()) {
                    $.ajax({
                        method: "post",
                        url: "/user/changePassword",
                        data: {phone: phone, password: password},
                        success: function (res) {
                            alert(res.message);
                            window.location.assign('/login');
                        }
                    });
                } else {
                    alert('验证码错误');
                    verif_code = "";
                }
            }
        });
    });
});