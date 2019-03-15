/**
 * @Description: 对应home pug
 * @author Li Xi
 * @date 2019-03-15
 */


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