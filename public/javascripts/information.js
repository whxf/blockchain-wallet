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
            url: "/user/getInformation",
            success: function (res) {
                if (res.status === 1) {
                    alert('请先登录');
                    window.location.assign('/login');
                } else {
                    nickname = res.data.nickname;
                    balance = res.data.balance;
                    phone = res.data.phone;

                    var nickname_body = document.getElementById('nickname-input-box');
                    nickname_body.innerHTML = "<input type='text' class='form-control' name='nickname' placeholder='" + nickname + "'>";

                    var phone_body = document.getElementById('phone-input-box');
                    phone_body.innerHTML = "<input id='phone' type='number' class='form-control' name='phone' disabled='' placeholder='" + phone + "'>";
                }
            }
        });
    });

    $('#button-confirm-change-nickname').click(function () {
        var nickname = $("input[name='nickname']").val();

        if (is_null(nickname)) {
            alert('请输入新昵称！');
            return;
        }

        if (checkLength(nickname)){
            alert('昵称过长，请重新输入！');
            nickname = "";
            return;
        }

        $.ajax({
            method: "post",
            url: "/user/changeNickname",
            data: {nickname: nickname},
            success: function (res) {
                alert(res.message);
                window.location.assign('/dashboard');
            }
        });
    });

    $('#send-message').click(function () {
        var phone = document.getElementById('phone').getAttribute('placeholder');

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
        var phone = document.getElementById('phone').getAttribute('placeholder');
        var password = $("input[name='password']").val();
        var confirm_password = $("input[name='confirm-password']").val();
        var verif_code = $("input[name='code']").val();


        if (is_null(password)) {
            alert('请输入新登录密码');
            return;
        }
        if (checkLength(password)){
            alert('密码过长，请重新输入！');
            password = "";
            return;
        }
        if (is_null(confirm_password)) {
            alert('请确认登录密码');
            return;
        }

        if (password !== confirm_password) {
            alert('登录密码不同，请重新输入登录密码');
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

    $('#button-confirm-change-transfer-password').click(function () {
        var phone = document.getElementById('phone').getAttribute('placeholder');
        var password = $("input[name='transfer-password']").val();
        var confirm_password = $("input[name='confirm-transfer-password']").val();
        var verif_code = $("input[name='code']").val();


        if (is_null(password)) {
            alert('请输入新支付密码');
            return;
        }
        if (is_null(confirm_password)) {
            alert('请确认支付密码');
            return;
        }
        if (checkLength(password)){
            alert('密码过长，请重新输入！');
            password = "";
            return;
        }

        if (password !== confirm_password) {
            alert('支付密码不同，请重新输入支付密码');
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
                        url: "/user/changeTransferPassword",
                        data: {phone: phone, password: password},
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