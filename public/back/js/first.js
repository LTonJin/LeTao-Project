
$('.first').on('click',function () {
    $('.first').addClass('now');
})

$(function () {

    var currentPage = 1;
    var pageSize = 3;

    function render() {

        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                var html = template("tpl",data);
                $("tbody").html(html);


                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本
                    currentPage:currentPage,
                    size:"small",
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }

        })


    }

    render();


    // 添加分类给btn_add添加一个点击事件
    $(".btn_add").on("click",function () {
        $("#addcateModal").modal("show");

    })

    // 表达校验
    var $from = $("#from");
    console.log($from);
    $from.bootstrapValidator({
        // 校验时的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categroyName:{
                validators:{
                    notEmpty:{
                        message:"请输入分类名称"
                    }
                }
            }
        }

    });
// 表单校验成功时

    $from.on("success.form.bv",function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$from.val(),
            success:function (data) {
                console.log($from.serialize());
                console.log(data);
                if (data.success){
                    // 成功之后关闭模态框
                    $("#addcateModal").modal("hide");
                    // 重新渲染第一页
                    currentPage = 1;
                    render();
                    // 重置表单
                    $from.data("bootstrapValidator").resetForm();
                    $from[0].reset();
                }

            }
            
        })
    })

});










