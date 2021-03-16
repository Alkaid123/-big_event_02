$(function () {
    // 1、自定义验证规则
    let form = layui.form;
    // console.log(form);
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称的长度在 1 ~ 6 位之间'
            };
        }
    });

    // 获取用户信息，渲染页面
    initUserInfo();

    // 2、封装 渲染页面
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            // data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 失败
                if (res.status != 0) {
                    return layer.msg(res.message)
                };

                // 成功
                form.val("formUserInfo", res.data);
            }
        });
    };

    // 3、 重置用户信息
    $('#btnReset').on('click', function (e) {
        // 组织表单的默认提交行为
        e.preventDefault();
        // 重新渲染页面
        initUserInfo();
    });

    let layer = layui.layer;
    // 4、 修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();

        // 发送 ajax 请求
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message)
                };

                // 成功，弹框，渲染页面
                layer.msg('恭喜您，修改用户信息成功');
                window.parent.getUserInfo();
            }
        });
    })
});