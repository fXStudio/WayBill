Ext.define('MdOrderModule.view.MdOrderWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdorderwindow',
	
	requires: ["MdOrderModule.view.MdOrderForm"],
	
	title: '维护订单',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 360,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mdorderform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});