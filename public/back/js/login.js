

$(function () {
    var $form = $('#form')
    $form.bootstrapValidator({
        // 提示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validting: 'glyphicon glyphicon-refresh'
        },
        // 属性对应的是表单元素的名字
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'username is empty'
                    },
                    callback:{
                        message:'username is error'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'password is empty'
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:'password between 6word and 18word'
                    },
                    callback:{
                        message:'password is error'
                    }
                }
            }
        }
    }).on('success.form.bv',function(e){
        e.preventDefault();
        console.log("hehe")
        // var $form = $(e.target);
        $.ajax({
            type:'post',
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success){
                    location.href = 'index.html';
                }else{
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    if(data.error == 1000){
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error ==1001){
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');

                    }
                }
            }
        })
    });
    $('[type="reset"]').on('click',function(){
        /*6.重置验证*/
        $('#form').data('bootstrapValidator').resetForm();
    });
})