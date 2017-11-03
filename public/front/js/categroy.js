


var sc = mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

$.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (data) {
        console.log(data);
        var html = template("tpl",data);
        $(".categoryName").append(html);
        render(data.rows[0].id)

    }

});

function render(id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{
            id:id
        },
        success:function (data) {
            var html = template("tpl2",data);
            $(".nav_right ul").html(html);

        }
    })
}

$(".categoryName").on("click","li",function () {

    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    render(id);

    sc[1].scrollTo(0,0,500);

})