

mui(".mui-scroll-wrapper").scroll({
    indicators: false
});


// 获取缓存中的数据转换成数组
function getHistory() {
    var search_history = localStorage.getItem("lt_search_history")||"[]";
    var arr = JSON.parse(search_history);
    return arr;
}

function render() {
    var arr = getHistory();
    $(".lt_history").html(template("tpl",{arr:arr}));
}

render();


$(".lt_history").on("click",".icon_empty",function () {
    localStorage.removeItem("lt_search_history");
    render();
})



$(".lt_history").on("click",".fa-close",function () {

    var index = $(this).data("index");
    var a = $(this).siblings("a")[0];
    console.log(a);
    $(".search_text").val(a.text());

    var btnArr = ["是","否"];
    mui.confirm("你确定要删除这条记录吗？","警告",btnArr,function (data) {


        if(data.index == 0){
            var arr = getHistory();
            // var index = $(".fa-close").data("index");
            arr.splice(index,1);
            localStorage.setItem("lt_search_history",JSON.stringify(arr));
            render();
            mui.toast("操作成功");

        }else{
            mui.toast("操作取消");
        }
    })
})

$(".search_btn").on("click",function () {
    var key = $(".search_text").val().trim();
    if(key == ""){
        mui.alert("请输入内容","温馨提示");
        return;
    }
    var arr  =getHistory();
    var index = arr.indexOf(key);
    if (index >-1){
        arr.splice(index,1);
    }
    if(arr.length >=10){
        arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    location.href = "searchList.html?key="+key;
    // render();


})
















