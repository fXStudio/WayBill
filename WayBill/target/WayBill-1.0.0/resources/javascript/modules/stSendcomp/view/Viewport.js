Ext.define('STSendCompModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
       'STSendCompModule.view.SendcompGrid', 
       'STSendCompModule.view.PagepartGrid'
    ],
    
    layout: 'border',
    defaults: { split: true },
    items: [{
    	xtype: 'sendcompgrid',
    	region: 'north',
        height: 420
    }, {
    	xtype: 'pagepartgrid',
    	region: 'center'
    }]
});
