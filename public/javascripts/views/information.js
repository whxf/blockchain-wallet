$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $(function () {
        var nickname;
        var balance;
        var phone;

        $.ajax({
            method: "post",
            url: "/api/getUserInfo",
            success: function (res) {
                if (res.status === 1) {
                    alert('请先登录');
                    window.location.assign('/login');
                } else {
                    console.log('sss');
                    nickname = res.nickname;
                    balance = res.balance;
                    phone = res.phone;

                    var nickname_body = document.getElementById('nickname-input-box');
                    nickname_body.innerHTML = "<input type='text' class='form-control' name='nickname' placeholder='" + nickname + "'>";

                    var phone_body = document.getElementById('phone-input-box');
                    phone_body.innerHTML = "<input type='number' class='form-control' name='phone' disabled='' placeholder='" + phone + "'>";
                }
            }
        });
    });

    $('#button-confirm-change-nickname').click(function () {
        var nickname = $("input[name='nickname']").val();

        console.log(nickname);

        if (is_null(nickname)) {
            alert('请输入新昵称！');
            return;
        }

        $.ajax({
            method: "post",
            url: "/api/changeNickname",
            data: {nickname: nickname},
            success: function (res) {
                alert(res.message);
                window.location.assign('/dashboard');
            }
        });
    });

    $('#button-confirm-change-password').click(function () {
        var password = $("input[name='password']").val();
        var confirm_password = $("input[name='confirm-password']").val();


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
                        url: "/api/changePassword",
                        data: {password: password},
                        success: function (res) {
                            alert(res.message);
                            window.location.assign('/dashboard');
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