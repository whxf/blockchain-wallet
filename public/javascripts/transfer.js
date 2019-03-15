/**
 * @Description: 对应transfer withdraw recharge pug
 * @author Li Xi
 * @date 2019-03-15
 */

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-confirm-transfer').click(function () {
        this.disabled = true;
        var receiver = $("input[name='receiver']").val();
        var transfer_amount = $("input[name='transfer-amount']").val();
        var password = $("input[name='transfer-password']").val();


        if (is_null(receiver)) {
            alert('请输入收款人');
            return;
        }
        if (checkPhone(receiver) === false) {
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
            url: "/transfer/transfer",
            data: {receiver: receiver, transfer_amount: transfer_amount, password: password},
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
                    } else {
                        window.location.assign('/transfer');
                    }
                }
            }
        });
    });

    $('#button-confirm-recharge').click(function () {
        this.disabled = true;
        var recharge_amount = $("input[name='recharge-amount']").val();
        var password = $("input[name='recharge-password']").val();
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
            url: "/transfer/recharge",
            data: {recharge_amount: recharge_amount, password: password},
            success: function (res) {
                if (res.status === 0) {
                    alert('充值成功！');
                    window.location.assign('/dashboard');
                } else {
                    alert(res.message);
                    recharge_amount = '';
                    if (res.message === '请先登录') {
                        window.location.assign('/login');
                    } else {
                        window.location.assign('/recharge');
                    }
                }
            }
        });
    });

    $('#button-confirm-withdraw').click(function () {
        this.disabled = true;
        var withdraw_amount = $("input[name='withdraw-amount']").val();
        var password = $("input[name='withdraw-password']").val();

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
            url: "/transfer/withdraw",
            data: {withdraw_amount: withdraw_amount, password: password},
            success: function (res) {
                if (res.status === 0) {
                    alert('提现成功！');
                    window.location.assign('/dashboard');
                } else {
                    alert(res.message);
                    withdraw_amount = '';
                    if (res.message === '请先登录') {
                        window.location.assign('/login');
                    } else {
                        window.location.assign('/withdraw');
                    }
                }
            }
        });
    });
});