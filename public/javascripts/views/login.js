$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-sign-in').click(function () {
        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();

        $.ajax({
            method: "post",
            url: "/login",
            data: {phone: phone, password: password},
        });
    });
});