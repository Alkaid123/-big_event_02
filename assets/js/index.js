$(function () {
    // 1、获取信息
    getUserInfo();
});

// 获取信息，其它页面也要用，所以要封装成函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            console.log(res);
        }
    });
}