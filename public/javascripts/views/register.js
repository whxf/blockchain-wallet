$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-register').click(function () {
        var nickname = $("input[name='nickname']").val();
        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();
        var confirm_password = $("input[name='confirm-password']").val();

        if (is_null(nickname)) {
            alert('请输入昵称');
            return;
        }
        if (is_null(phone)) {
            alert('请输入电话号码');
            return;
        }
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

        $.ajax({
            method: "post",
            url: "/register",
            data: {nickname: nickname, phone: phone, password: password},
            success: function (res) {
                if (res.status === 0) {
                    window.location.assign('/login');
                } else if (res.status === 1) {
                    alert(res.message);
                }
            }
        });
    });
});