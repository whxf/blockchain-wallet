/**
 * @Description: 对应dashboard pug
 * @author Li Xi
 * @date 2019-03-15
 */

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $(function () {
        var nickname;
        var balance;
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
                    $("#hello-words").text(nickname + "，你好!");
                    $("#user-balance").text(balance.toString() + "元");
                }
            }
        });
    });

    $('#logout').click(function () {
        $.ajax({
            method: "post",
            url: "/user/logout",
            success: function (res) {
                window.location.assign('/');
            }
        });
    });

    $('#change-infomation-option').click(function () {
        window.location.assign('/information');
    });

    $('#recharge-option').click(function () {
        window.location.assign('/recharge');
    });

    $('#transfer-option').click(function () {
        window.location.assign('/transfer');
    });

    $('#withdraw-option').click(function () {
        window.location.assign('/withdraw');
    });

    $('#record-option').click(function () {
        window.location.assign('/record');
    });
});