$('.sub-news').click(function () {
    if ($('.news #title').val() === '') {
        alert('请输入文章标题！');
        return false;
    } else if ($('.news #editor .w-e-text').html().length === 11) {
        alert('请输入文章内容！');
        return false;
    } else if ($('.news #draft').val().length === 0) {
        alert('请输入文章摘要！');
        return false;
    } else {
        $.ajax({
            type: "post",
            url: "/news/updateNews",
            data: {
                id: newsId,
                title: $('.news #title').val(),
                language: $('.news #language').val(),
                home: $('.news #ishome').val(),
                draft: $('.news #draft').val(),
                comment: $('.news #comment').val(),
                text: $('.news #editor .w-e-text').html()
            },
            async: false,
            dataType: 'JSON',
            success: function (res) {
                console.log(res);
                if (res.status === 1) {
                    $('.news #title').val('');
                    $('.news #language').val('');
                    $('.news #ishome').val('');
                    $('.news #draft').val('');
                    $('.news #comment').val('');
                    $('.news #editor .w-e-text').html('');
                    Feng.success("提交成功!");
                } else {
                    alert(res.message);
                }
            }, error: function (res) {
                console.log(res);
            }
        });
    }
});

(function init() {
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.customConfig.uploadImgTimeout = 10000;
    editor.customConfig.uploadImgServer = '/news/uploadImg';//上传图片到服务器文件夹
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; //自定义图片大小
    editor.customConfig.uploadFileName = 'file';
    editor.create();
    $.ajax({
        type: "post",
        url: "/news/selectOne",
        data: {
            id: newsId
        },
        async: false,
        dataType: 'JSON',
        success: function (res) {
            if (res.status === 1) {
                var data = res.data;
                $('.news #title').val(data.title);
                $('.news #language').val(data.language);
                $('.news #ishome').val(data.home);
                $('.news #draft').val(data.draft);
                $('.news #comment').val(data.comment);
                $('.news #editor .w-e-text').html(data.text);
            } else {
                Feng.error("获取数据失败!");
            }
        }, error: function (res) {
            Feng.error("获取数据失败!" + JSON.stringify(res));
        }
    });
})();
