

$(function () {
    // 初始化滚动区域
   mui(".mui-scroll-wrapper").scroll({
       indicators:false
   });
    // 接受地址来传过来的值，拆分地址栏
    //思路：
    //1. 获取地址栏的参数，设置到文本框中.
    //2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
    //3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
    //4. 点击排序，需要对商品进行排序。
    //5. 添加一个遮罩效果

    var data = {
        proName: '',
        brandId: '',
        price: '',
        num: '',
        page: 1,
        pageSize: 10
    };

    function render(data) {

       $.ajax({
           type:"get",
           url:"/product/queryProduct",
           data:data,
           success:function (data) {
               setTimeout(function(){
                   $(".lt_product").html(template("tpl",data));
               },1000)
           }

       })
    };

    var key = tools.getParam("key");
    $(".search_text").val(key);

    data.proName = key;
    render(data);

    // 点击按钮搜索
    $(".search_btn").on("click",function () {
        $(".lt_sort a").remove("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price = '';
        data.num = '';

        var key = $(".search_text").val().trim();
        if(key == ''){
            mui.toast("请输入内容");
        };
        $(".lt_product").html('<div class="loading"></div>');
        data.proName = key;
        render(data);

    });

    // 排序功能
    $(".lt_sort>a[data-type]").on("click",function () {
        console.log('hehe');
        var $this = $(this);
        var $span = $(this).find("span");
        if($this.hasClass("now")){
            $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        };
        var type = $this.data("type");
        var value = $span.hasClass("fa-angle-down")?2:1;

        data[type] = value;
        render(data);

    });


});



var tools = {
    //获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        //this指向的是谁：  4种调用模式
        return obj;
    },
    getParam:function (key) {
        return this.getParamObj()[key];
    }
}
