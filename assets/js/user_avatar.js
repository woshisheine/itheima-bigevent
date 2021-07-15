$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#upload').on('click', function(e) {
        $('#file').click()
    })
    $('#file').on('change', function(e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#yes').on('click', function() {
        //点击把图片上传到服务器
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            //使用post上传头像
        $.post('my/update/avatar', { avatar: dataURL }, function(res) {
            if (res.status !== 0) {
                return layer.masg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
                //更新父页面的头像显示
            window.parent.getUserInfo()
        })
    })
})