Ext.define('MdCarInfoModule.view.MdCarInfoWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdcarinfowindow',
	
	requires: ["MdCarInfoModule.view.MdCarInfoForm"],
	
	title: '维护车号',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 360,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mdcarinfoform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});