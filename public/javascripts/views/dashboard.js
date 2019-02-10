$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
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