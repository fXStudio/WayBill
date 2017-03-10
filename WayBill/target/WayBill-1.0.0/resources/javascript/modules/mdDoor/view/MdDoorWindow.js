Ext.define('MdDoorModule.view.MdDoorWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mddoorwindow',
	
	requires: ["MdDoorModule.view.MdDoorForm"],
	
	title: '维护物流门',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 360,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mddoorform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});