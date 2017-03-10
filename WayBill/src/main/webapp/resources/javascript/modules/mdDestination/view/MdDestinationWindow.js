Ext.define('MdDestinationModule.view.MdDestinationWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mddestinationwindow',
	
	requires: ["MdDestinationModule.view.MdDestinationForm"],
	
	title: '维护客户',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 360,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mddestinationform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});