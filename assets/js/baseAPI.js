$(function () {
    // 开发环境服务器地址
    let baseURL = "http://api-breakingnews-web.itheima.net"
    // 测试环境服务器地址
    // 生产环境服务器地址

    $.ajaxPrefilter(function (options) {
        // console.log(options);
        // console.log(options.url);
        options.url = baseURL + options.url;
    });
});