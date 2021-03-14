$(function () {
    // 需求1：点击 去注册账号 ， 注册页面显示，登录页面隐藏 
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击 去登录 ， 登录页面显示，注册页面隐藏 
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 需求2：自定义验证规则
    let form = layui.form;
    // console.log(form);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 判断 两次输入的密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box input[name="password"]').val();
            if (value != pwd) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 需求3： 实现注册功能    
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val(),
            },
            success: (res) => {
                // console.log(res);
                // 注册不成功弹出框
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };

                // 注册成功 弹出框，跳转到 登录区域，并将 注册区域的内容清空
                layer.msg('恭喜您，注册成功', { icon: 6 });
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }
        });
    });

    // 需求4： 实现登录功能
    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // 登录不成功弹出框
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };

                // 登录成功，跳转到 首页，保存token
                localStorage.getItem(res.token);
                location.href = '/index.html';
            }
        });
    });

});