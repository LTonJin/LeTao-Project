

    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });

    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
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



    var id = tools.getParam("productId");
    console.log(id);
    $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
        id:id
    },
    success:function (data) {
        console.log(data);
        var temp = data.size.split("-");
        var sizeArray = [];
        for(var i = temp[0]; i <= temp[1]; i++){
            sizeArray.push(i);
        }

        data.sizeArray = sizeArray;

        $(".mui-scroll").html( template("tpl", data) );

        //当内容渲染完成后，需要去初始化轮播图
        //轮播图效果
        mui('.mui-slider').slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });

        mui(".mui-numbox").numbox();


    }
});


