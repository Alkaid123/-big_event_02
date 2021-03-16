$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 2、选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    let layer = layui.layer;
    // 3、修改裁剪图片
    $('#file').on('change', function (e) {
        // 2.1 拿到用户选择的文件
        var file = e.target.files[0];

        // 判断 file 文件 是否有效
        if (file === undefined) {
            return layer.msg('图片为必传值！');
        };

        // 2.2 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        // 2.3 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    });

    // 4、上传图片
    $('#btnUpload').on('click', function () {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发送 ajax 请求
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                };

                // 成功 弹框，渲染页面
                layer.msg('恭喜您，头像上传成功', { icon: 6 });
                window.parent.getUserInfo();
            }
        });
    })

});