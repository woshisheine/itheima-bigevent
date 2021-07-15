$(function() {
    getUserInfo()


})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: 'my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)

        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎您,${name}`)
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').prop('src', user.user_pic).show()
    } else {
        $('.text-avatar').html(name[0]).show()
        $('.layui-nav-img').hide()
    }
}
$('#logout').on('click', function() {
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem('token')
        window.location.reload()
        layer.close(index);
    });
})