$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {

    $('#start').click(function () {

        $.ajax({
            method: "post",
            url: "/api/checkLogin",
            success: function (res) {
                if (res.status === 0) {
                    window.location.assign('/dashboard');
                } else {
                    window.location.assign('/login');
                }
            }
        });
    });
});