
// $('.second').on('click',function () {
//     $('.second').addClass('now');
// })

$(function () {

    var current = 1;
    var pageSize = 5;
    
    function render() {
        $.ajax({

            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:current,
                pageSize:pageSize
            },
            success:function (data) {
                var html = template("tpl",data);
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({

                    bootstrapMajorVersion: 3,
                    currentPage: current,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a,b,c,page){
                        current = page;
                        render();
                    }

                })

            }

        })
    }
    render();

    // 显示模态框
    $(".btn_add").on("click",function () {
        $("#addcatesecModal").modal("show");
        // 从后台获取数据渲染一级分类
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:1000,
            },
            success:function (data) {
                $(".dropdown-menu").html(template("tpl1",data));
            }
        });

    });

    // 将下拉框里的选中的内容放到下拉框了
    //点击下拉框，让某个选中
    $(".dropdown-menu").on("click", "a", function () {
        //获取到当前a标签的内容，设置给dropdown-text
        $(".dropdown-text").text( $(this).text() );

        //获取当前a标签的自定义属性，data-id,修改隐藏域的value值
        $("#categoryId").val( $(this).data("id") );

        //让categoryId的校验通过
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })


    //初始文件上传
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


    //表单校验
    var $form = $("#form");
    $form.bootstrapValidator({
        //默认不校验的配置
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

    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        //发送ajax请求，把二级分类存起来
        $.ajax({

            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){

                    //成功的操作
                    //1. 关闭模态框
                    $("#addcatesecModal").modal("hide");
                    //2. 渲染第一页
                    currentPage = 1;
                    render();
                    //3. 重置表单
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    //手动把dropdown重置，把图片的地址重置
                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        });
    })

});

