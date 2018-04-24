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
            url: "/news/newsInsert",
            data: {
                title: $('.news #title').val(),
                language: $('.news #language').val(),
                home: $('.news #ishome').val(),
                draft: $('.news #draft').val(),
                comment: $('.news #comment').val(),
                text: $('.news #editor .w-e-text').html()
            },
            async: true,
            dataType: 'JSON',
            success: function (res) {
                console.log(res);
                if (res.code === 0) {
                    alert('上传成功')
                } else {
                    alert(res.msg);
                }
            }, error: function (res) {
                console.log(res);
            }
        });
    }
});