
if(location.href.indexOf("login.html") < 0 ){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    });
}

$(document).ajaxStart(function () {
    //让进度条显示出来
    NProgress.start();
})


$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});


$(".child").prev().on("click", function () {
    $(this).next().slideToggle();
})

$(".cai").on("click",function () {
    $(".aside").toggleClass("now");
    $(".lt_right").toggleClass("now");
})

//共用的退出功能
$(".tui").on("click", function () {
    $("#logoutModal").modal("show");
});

$(".btn_logout").on("click", function () {

    //发送一个ajax请求，告诉服务器我要退出了，服务器会清空你的session
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
            if(data.success){
                window.location.href = "login.html";
            }
        }
    })

});
