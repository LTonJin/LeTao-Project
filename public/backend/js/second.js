$(function () {

    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success:function (data) {
                $("tbody").html(template("tpl",data));

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
    render();

    $(".add_btn").on("click",function () {
        $("#addcategoryModal").modal("show");
    })
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function (data) {

            $(".dropdown-menu").html( template("tpl2", data) );

        }
    });

    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown-text").text($(this).text());
        var id = $(this).data("id");
        $("#categoryId").val(id);
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })
    // 上传图片验证
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            //给默认图片设置src
            $(".img_box img").attr("src", data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    // 表单验证
    var $form = $("#form");
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            }
        }
    });

    $form.on("success.form.bv",function (e) {
        e.preventDefault();

        $.ajax({

            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    $("#addcategoryModal").modal("hide");

                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src","images/none.png");

                }
            }
        })
    });

});

