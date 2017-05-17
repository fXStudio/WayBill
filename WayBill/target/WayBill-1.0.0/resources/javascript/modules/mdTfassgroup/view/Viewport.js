Ext.define('MdTfassGroupModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
               'MdTfassGroupModule.view.MdTerminalGroupGrid',
               'MdTfassGroupModule.view.GroupitemGrid'
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
