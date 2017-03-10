Ext.define('MdPartInfoModule.view.MdPartInfoWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mdpartinfowindow',
	
	requires: ["MdPartInfoModule.view.MdPartInfoForm"],
	
	title: '维护零件',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 560,
    y: 100,
    closeAction: 'hide',
    items: {xtype: 'mdpartinfoform'},
    buttons: [{
        text: '提交',
        action: 'submit'
    }, {
        text: '取消',
        action: 'cancel'
    }]
});