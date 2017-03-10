Ext.define('MDCarpagenoModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
       'MDCarpagenoModule.view.CarGrid', 
       'MDCarpagenoModule.view.PartGrid'
    ],
    
    layout: 'border',
    defaults: { split: true },
    items: [{
    	xtype: 'cargrid',
    	region: 'north',
        height: 320
    }, {
    	xtype: 'partgrid',
    	region: 'center'
    }]
});
