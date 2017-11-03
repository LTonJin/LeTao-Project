
// 进入面页前先判断一下用户是否登录
if(window.location.href.indexOf("login.html")<0){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                location.href = "login.html";
            }
        }
    })
}




$(".child").prev().on("click", function () {
    $(this).next().slideToggle();
})


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


// 退出模态框
$(".glyphicon").on("click",function () {
    $("#logoutModal").modal("show");
    // 点击确定时发送jax请求，告诉后台我要退出了
    $(".btn_logout").on("click",function () {
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function (data) {
                if(data.success){
                    window.location.href = "login.html";
                }
            }
        })
    })

})