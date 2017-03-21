Ext.define('MdTerminalGroupModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
               'MdTerminalGroupModule.view.MdTerminalGroupGrid',
               'MdTerminalGroupModule.view.GroupitemGrid'
    ],
    
    layout: 'border',
    items: [{
        xtype: 'mdterminalgroupgrid',
        region: 'north',
        resizable: false,
        height: 200
    }, {
    	title: '配货单类型',
    	region: 'center', 
    	xtype: 'groupitemgrid'
    }]
});
