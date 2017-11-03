$(function () {

var currentPage = 1;
var pageSize = 5;
function render() {
    $.ajax({
        type:"get",
        url:"/product/queryProductDetailList",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function (data) {
            $("tbody").html(template("tpl",data));

            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage:currentPage,
                totalPages: Math.ceil(data.total / pageSize),
                size:"small",
                onPageClicked(a,b,c,page){
                    currentPage=page;
                    render();
                }
            })
        }
    })
}
render();

$(".add_btn").on("click",function () {
    $("#addcategoryModal").modal("show");
})

    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function (data) {
            $(".dropdown-menu").html(template("tpl2",data));
        }
    });

    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown-text").text($(this).text());
        var id = $(this).data("id");
        $("#brandId").val(id);
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");

    })

    // 初始化文件上传
    var imgArray = [];
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e,data) {
            $(".img_box").append('<img src="'+data.result.picAddr+'"width="100" height="100">')
            imgArray.push(data.result);
            if(imgArray.length ==3){
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            }else{
                $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }
        }
    });
    var $form = $("#form");
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        //必须是0以上的数字
                        regexp: /^[1-9]\d*$/,
                        message: "请输入一个大于0的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        //33-55
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的折扣价"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张商品图片"
                    }
                }
            }
        }
    });

    $form.on("success.form.bv",function (e) {
        e.preventDefault();
        var param = $form.serialize();
        console.log(param);
        param += "&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
        param += "&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
        param += "&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;
        console.log(param);
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function (data) {
                if(data.success){
                    $("#addcategoryModal").modal("hide");
                    currentPage=1;
                    render();

                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dropdown-text").text("请选择二级分类");
                    $(".img_box img").remove();
                    imgArray = [];
                }
            }
        })
    });
    

});