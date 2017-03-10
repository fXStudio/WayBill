Ext.define('MdOrderModule.view.TerminalPartInfoWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.terminalpartinfowindow',
	
	title: '维护订单',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 560,
    y: 100,
    closeAction: 'hide',
    items: Ext.create('MdOrderModule.view.TerminalPartInfoGrid', {id: 'terminalpartinfogrid',height: 300}),
    buttons: [{
        text: '提交',
        action: 'commit'
    }, {
        text: '取消',
        action: 'cancelTerminal'
    }]
});