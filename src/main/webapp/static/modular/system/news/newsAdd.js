var E = window.wangEditor;
var editor = new E('#editor');
//editor.customConfig.uploadImgShowBase64 = true;
editor.customConfig.uploadImgTimeout = 10000;
editor.customConfig.uploadImgServer = '/news/uploadImg';//上传图片到服务器文件夹
editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; //自定义图片大小
editor.customConfig.uploadFileName = 'file';
editor.create();

$('.sub-news').click(function () {
    if ($('.news #title').val() === '') {
        Feng.error("请输入标题!");
        return false;
    } else if ($('.news #editor .w-e-text').html().length === 11) {
        Feng.error("请输入文章内容！");
        return false;
    } else if (!$('.news #realtime').val()) {
        Feng.error("请输入发布时间！");
        return false;
    } else if ($('.news #draft').val().length === 0) {
        Feng.error("请输入文章摘要！");
        return false;
    } else {
        $.ajax({
            type: "post",
            url: "/news/insertNews",
            data: {
                title: $('.news #title').val(),
                language: $('.news #language').val(),
                home: $('.news #ishome').val(),
                realtime: $('.news #realtime').val(),
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
                    $('.news #realtime').val('');
                    $('.news #draft').val('');
                    $('.news #comment').val('');
                    $('.news #editor .w-e-text').html('');
                    Feng.success("上传成功!");
                } else {
                    Feng.error("上传失败！");
                    console.error(res.message);
                }
            }, error: function (res) {
                console.log(res);
            }
        });
    }
});