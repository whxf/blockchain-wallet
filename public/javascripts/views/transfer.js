$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#button-confirm-transfer').click(function () {
        var receiver = $("input[name='receiver']").val();
        var transfer_amount = $("input[name='transfer_amount']").val();
        $.ajax({
            method: "post",
            url: "/transfer",
            data: {receiver: receiver, transfer_amount: transfer_amount},
            success: function (res) {
                console.log(res);
                if(res.status === 0){
                    window.location.assign('/');
                }
            }
        });
    });
});