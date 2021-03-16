$(function () {
    // 1、获取信息
    getUserInfo();

    // 2、点击退出按钮 弹窗 销毁token并跳转到登录页面
    $('#btnLogout').on('click', function () {
        //eg1
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //销毁token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html';

            layer.close(index);
        });
    });
});

// 获取信息，其它页面也要用，所以要封装成函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            // console.log(res.data);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            };
            // 请求成功，渲染头像
            renderAvantar(res.data);
        }
    });
};

function renderAvantar(user) {
    // 1、渲染名称，有昵称就先用昵称，没有就用登录的名称
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 2、渲染头像
    // 如果有上传头像，就显示上传的头像
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 如果没有上传头像，就显示首字母大写
        let text = name[0].toUpperCase();
        // console.log(text);
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(text);
    };
};