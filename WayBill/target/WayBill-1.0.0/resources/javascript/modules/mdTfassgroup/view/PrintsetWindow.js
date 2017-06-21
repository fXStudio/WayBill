Ext.define('MdTfassGroupModule.view.PrintsetWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.printsetwindow',
	
	title: '维护零件名称分组',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 560,
    y: 100,
    closeAction: 'hide',
    items: Ext.create('MdTfassGroupModule.view.PrintsetGrid', {id: 'printsetgrid',height: 300}),
    buttons: [{
        text: '提交',
        action: 'commit'
    }, {
        text: '取消',
        action: 'cancelTerminal'
    }]
});