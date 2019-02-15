$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function dataType(sender, receiver, user_phone) {
    if (sender === 'alipay') {
        return 1; //支付宝充值
    }
    if (receiver === 'alipay') {
        return 2; //支付宝提现
    }
    if (sender === user_phone) {
        return 3; //向xx转账
    }
    if (receiver === user_phone) {
        return 4; //收到xx转账
    }
    return 0;
}

//（向xx转账，收到xx转账，支付宝提现，支付宝充值
function formatData(data, user_phone) {
    var sender = data.sender;
    var receiver = data.receiver;
    var transfer_amount = data.transfer_amount;
    var transfer_time = data.transfer_time;
    var transfer_type = dataType(sender, receiver, user_phone);

    var ret = null;
    switch (transfer_type) {
        case 1://支付宝充值
            ret = "<tr class='table-primary'>" +
                "<th>" + "充值" + "</th>" +
                "<td>" + "支付宝充值" + "</td>" +
                "<td>" + "+" + transfer_amount + "</td>" +
                "<td>" + transfer_time + "</td>" +
                "</tr>";
            break;
        case 2://支付宝提现
            ret = "<tr class='table-secondary'>" +
                "<th>" + "提现" + "</th>" +
                "<td>" + "支付宝提现" + "</td>" +
                "<td>" + "-" + transfer_amount + "</td>" +
                "<td>" + transfer_time + "</td>" +
                "</tr>";
            break;
        case 3://向xx转账
            ret = "<tr class='table-light'>" +
                "<th>" + "转出" + "</th>" +
                "<td>" + "向" + receiver + "转账" + "</td>" +
                "<td>" + "-" + transfer_amount + "</td>" +
                "<td>" + transfer_time + "</td>" +
                "</tr>";
            break;
        case 4://收到xx转账
            ret = "<tr class='table-light'>" +
                "<th>" + "转入" + "</th>" +
                "<td>" + "收到" + sender + "转账" + "</td>" +
                "<td>" + "+" + transfer_amount + "</td>" +
                "<td>" + transfer_time + "</td>" +
                "</tr>";
            break;
    }

    return ret;
}

$(function () {
    $(function () {
        var user_phone;
        $.ajax({
            method: "post",
            url: "/api/getSessionData",
            success: function (res) {
                user_phone = res.phone;
            }
        });

        $.ajax({
            method: "post",
            url: "/api/getRecord",
            data: {start: 0},
            success: function (res) {
                if (res.status === 0) {
                    if (user_phone === '0') {
                        alert('请先登录');
                        if (res.message === '请先登录') {
                            window.location.assign('/login');
                        }
                        return;
                    }
                    var tbody = document.getElementById('table-body');
                    tbody.innerHTML = "";

                    for (var i in res.data) {
                        tbody.innerHTML += formatData(res.data[i], user_phone);
                    }
                } else if (res.status === 1) {
                    alert(res.message);
                    window.location.assign('/dashboard');
                }
            }
        });
    });


});