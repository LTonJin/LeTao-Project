
// $(".yonghuguanli").on("click",function () {
//     $(".yonghuguanli").addClass("now");
// })


// 从后台拿去数据添加到页面中
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {

        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                var html = template("tpl", data);
                $("tbody").html(html);

                //分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本
                    currentPage: currentPage,//指定了当前是第几页
                    size:"small",
                    totalPages: Math.ceil(data.total/pageSize),
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }

                });

            }
        });
    }
    render();

    // 给按钮添加点击事件,来切换禁用和正常
    $("tbody").on("click",".btn",function () {

        $("#userModal").modal("show");

        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("isDelete");
        isDelete = isDelete === 1 ? 0 : 1;
        
        $(".btn_confirm").off().on("click",function () {

            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function (data) {
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })
        

    })
});













