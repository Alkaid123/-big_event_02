$(function () {
    // 开发环境服务器地址
    let baseURL = "http://api-breakingnews-web.itheima.net"
    // 测试环境服务器地址
    // 生产环境服务器地址

    $.ajaxPrefilter(function (options) {
        // console.log(options);
        // console.log(options.url);
        options.url = baseURL + options.url;

        // 如果 
        if (options.url.indexOf('/my/') != -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        };

        options.complete = function (res) {
            // console.log(res.responseJSON);
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                // 清空本地token
                localStorage.removeItem('token');
                // 跳转到 登录页面
                location.href = '/login.html';
            }
        }
    });
});