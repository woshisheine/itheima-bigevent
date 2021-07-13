$(function() {
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        //表单自定义预验证
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('#password').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data);
        $.post('api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登陆成功！')
                //把token值存储在本地
            localStorage.setItem('token', res.token)
                //跳转至home
            location.href = './index.html'
        })
    })
})