$(function () {
    // 1、 自定义密码规则
    let form = layui.form;
    // console.log(form);
    form.verify({
        // 1、密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 2、新密码
        samePwd: function (value) {
            // 如果 新密码 和 密码 的值一样，则报错
            // 获取 密码的值
            let pwd = $('input[name="oldPwd"]').val();
            // console.log(pwd);
            if (value == pwd) {
                return '新密码和密码的值不能一样';
            };
        },
        // 3、确认密码
        rePwd: function (value) {
            // 如果 确认密码 和 新密码 不一样，则报错
            let newpwd = $('input[name="newPwd"]').val();
            if (value != newpwd) {
                return '确认密码和新密码的值必须一致'
            }
        },
    });

    // // 2、重置密码
    // $('#btnReset').on('click',function (e) {
    //     // 阻止默认提交行为
    //     e.preventDefault();

    // })

    let layer = layui.layer;
    // 2、修改密码
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交
        e.preventDefault();

        // 发送 ajax 请求
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }

                // 成功 弹框，清空 form 表单
                layer.msg('恭喜您，修改密码成功！', { icon: 6 });
                $('.layui-form')[0].reset();
            }
        });
    })
});