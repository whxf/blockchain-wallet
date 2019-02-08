$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-login').click(function () {
        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();

        $.ajax({
            method: "post",
            url: "/login",
            data: {phone: phone, password: password},
            success: function (res) {
                if(res.status === 0){
                    window.location.assign('/dashboard');
                }
                else if(res.status === 1){
                    window.location.assign('/home');
                }
            }
        });
    });
});