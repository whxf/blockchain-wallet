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
        if (is_null(transfer_amount)) {
            alert('请输入转账金额');
            return;
        }
        if (checkmoney(transfer_amount) === false) {
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
                    window.location.assign('/');
                } else {
                    alert(res.message);
                    receiver = '';
                    transfer_amount = '';
                }
            }
        });
    });
});