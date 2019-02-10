$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    // $(function () {
    //     $.ajax({
    //         method: "post",
    //         url: "/getRecord",
    //         data: {start: 0},
    //         success: function (res) {
    //             if (res.status === 0) {
    //                 alert(res.data[0].sender);
    //                 // TODO: 将json数据放入到table中
    //             } else if (res.status === 1) {
    //                 alert(res.message);
    //                 window.location.assign('/dashboard');
    //             }
    //         }
    //     });
    // });


});