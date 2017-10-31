
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
                console.log(data);
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
    })



});