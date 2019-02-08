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

        $.ajax({
            method: "post",
            url: "/register",
            data: {nickname: nickname, phone: phone, password: password},
            success: function (res) {
                if (res.status === 0) {
                    window.location.assign('/login');
                } else if (res.status === 1) {
                    window.location.assign('/home');
                }
            }
        });
    });
});