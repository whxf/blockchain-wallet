$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    $('#recharge-option').click(function () {
        alert('功能待开发！');
    });

    $('#transfer-option').click(function () {
        window.location.assign('/transfer');
    });

    $('#withdraw-option').click(function () {
        alert('功能待开发！');
    });

    $('#record-option').click(function () {
        alert('功能待开发！');
    });
});