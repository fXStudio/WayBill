Ext.define('MdTerminalGroupModule.view.MdTerminalGroupWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdterminalgroupwindow',
	
	requires: ["MdTerminalGroupModule.view.MdTerminalGroupForm"],
	
	title: '维护配货单查询分组',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 360,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mdterminalgroupform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});