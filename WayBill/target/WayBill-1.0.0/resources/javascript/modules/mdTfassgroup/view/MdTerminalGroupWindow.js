Ext.define('MdTfassGroupModule.view.MdTerminalGroupWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdterminalgroupwindow',
	
	requires: ["MdTfassGroupModule.view.MdTerminalGroupForm"],
	
	title: '零件名称分组',
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