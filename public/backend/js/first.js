$(function () {

    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
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

    // 添加分类
    $(".add_btn").on("click",function () {
        $("#addcategoryModal").modal("show");

    })
    // 进行表单验证
    $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            //name属性
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }

        }
    })
    
    $form.on("success.form.bv",function (e) {
        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    $("#addcategoryModal").modal("hide");
                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        })
    })

});