$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-confirm-transfer').click(function () {
        var receiver = $("input[name='receiver']").val();
        var transfer_amount = $("input[name='transfer_amount']").val();

        if (is_null(receiver)) {
            alert('请输入收款人');
            return;
        }
        if(checkPhone(phone)){
            alert('请输入有效电话号码');
            return;
        }
        if (is_null(transfer_amount)) {
            alert('请输入转账金额');
            return;
        }
        if (checkmoney(transfer_amount) === false ||
            parseFloat(transfer_amount) <= 0.0
        ) {
            alert('请输入合法金额');
            transfer_amount = '';
            return;
        }

        $.ajax({
            method: "post",
            url: "/transfer",
            data: {receiver: receiver, transfer_amount: transfer_amount},
            success: function (res) {
                if (res.status === 0) {
                    alert('转账成功！');
                    window.location.assign('/dashboard');
                } else {
                    alert(res.message);
                    receiver = '';
                    transfer_amount = '';
                    if (res.message === '请先登录') {
                        window.location.assign('/login');
                    }
                }
            }
        });
    });

    $('#button-confirm-recharge').click(function () {
        var recharge_amount = $("input[name='recharge_amount']").val();
        if (is_null(recharge_amount)) {
            alert('请输入充值金额');
            return;
        }

        if (checkmoney(recharge_amount) === false ||
            parseFloat(recharge_amount) <= 0.0
        ) {
            alert('请输入合法金额');
            recharge_amount = '';
            return;
        }

        $.ajax({
            method: "post",
            url: "/recharge",
            data: {recharge_amount: recharge_amount},
            success: function (res) {
                if (res.status === 0) {
                    alert('充值成功！');
                    window.location.assign('/dashboard');
                } else {
                    alert(res.message);
                    recharge_amount = '';
                    if (res.message === '请先登录') {
                        window.location.assign('/login');
                    }
                }
            }
        });
    });

    $('#button-confirm-withdraw').click(function () {
        var withdraw_amount = $("input[name='withdraw_amount']").val();
        if (is_null(withdraw_amount)) {
            alert('请输入提现金额');
            return;
        }

        if (checkmoney(withdraw_amount) === false ||
            parseFloat(withdraw_amount) <= 0.0
        ) {
            alert('请输入合法金额');
            withdraw_amount = '';
            return;
        }

        $.ajax({
            method: "post",
            url: "/withdraw",
            data: {withdraw_amount: withdraw_amount},
            success: function (res) {
                if (res.status === 0) {
                    alert('提现成功！');
                    window.location.assign('/dashboard');
                } else {
                    alert(res.message);
                    withdraw_amount = '';
                    if (res.message === '请先登录') {
                        window.location.assign('/login');
                    }
                }
            }
        });
    });
});