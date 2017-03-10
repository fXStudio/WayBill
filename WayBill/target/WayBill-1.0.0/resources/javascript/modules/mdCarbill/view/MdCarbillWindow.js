Ext.define('MdCarbillModule.view.MdCarbillWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdcarbillwindow',
	
	requires: ["MdCarbillModule.view.MdCarbillForm"],
	
	title: '准备装载',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 460,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mdcarbillform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});