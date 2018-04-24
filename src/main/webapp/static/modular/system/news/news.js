var news = {
    id: "newsTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};


/**
 * 初始化表格的列
 */
news.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '语言', field: 'language', align: 'center', valign: 'middle', sortable: true},
        {title: '标题', field: 'title', align: 'center', valign: 'middle', sortable: true},
        {title: '摘要', field: 'draft', align: 'center', valign: 'middle', sortable: true},
        {title: '发布时间', field: 'time', align: 'center', valign: 'middle', sortable: true},
        {title: '首页展示', field: 'home', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'comment', align: 'center', valign: 'middle', sortable: true},
        {title: '全文', field: 'text', align: 'center', valign: 'middle', sortable: true}];

};

/**
 * 检查是否选中
 */
news.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Role.seItem = selected[0];
        return true;
    }
};


$(function () {
    var defaultColunms = news.initColumn();
    var table = new BSTable(news.id, "/news/list", defaultColunms);
    // table.setPaginationType("client");
    table.init();
    news.table = table;
});