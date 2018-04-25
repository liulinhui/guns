var News = {
    id: "newsTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};


/**
 * 初始化表格的列
 */
News.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '语言', field: 'language', align: 'center', valign: 'middle', sortable: true},
        {title: '标题', field: 'title', align: 'center', valign: 'middle', sortable: true},
        {title: '摘要', field: 'draft', visible: false, align: 'center', valign: 'middle', sortable: true},
        {title: '发布时间', field: 'time', align: 'center', valign: 'middle', sortable: true},
        {title: '首页展示', field: 'home', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'comment', visible: false, align: 'center', valign: 'middle', sortable: true},
        {title: '全文', field: 'text', visible: false, align: 'center', valign: 'middle', sortable: true}];

};

/**
 * 检查是否选中
 */
News.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        News.seItem = selected[0];
        return true;
    }
};

/**
 * 添加新闻
 */
News.openAddNews = function () {
    window.open("/news/add", '_blank');
};

News.removeNews = function () {
    if (this.check()) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/news/delNews", function () {
                Feng.success("删除成功!");
                News.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", News.seItem.id);
            ajax.start();
        };

        Feng.confirm("是否删除新闻 " + News.seItem.title + "?", operation);
    }
};

News.openEdit = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '修改新闻',
            area: ['800px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/news/edit?id=' + this.seItem.id
        });
    }
}

News.refresh = function () {
    News.table.refresh();
};


$(function () {
    var defaultColunms = News.initColumn();
    var table = new BSTable(News.id, "/news/list", defaultColunms);
    table.setPaginationType("client");
    table.init();
    News.table = table;
});