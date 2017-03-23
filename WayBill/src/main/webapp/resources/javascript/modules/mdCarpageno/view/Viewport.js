Ext.define('MDCarpagenoModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
       'MDCarpagenoModule.view.CarGrid', 
       'MDCarpagenoModule.view.PartGrid', 
       'MDCarpagenoModule.view.ContainerPartGrid'
    ],
    
    layout: 'border',
    defaults: { split: true },
    items: [{
    	xtype: 'cargrid',
    	region: 'north',
        height: 320
    }, {
    	xtype: 'tabpanel', 
    	region: 'center',
    	items: [{
    		title: '装载配货单详细信息',
        	xtype: 'partgrid'
        }, {
        	title: '总成汇总',
        	xtype: 'containerpartgrid'
        }]
    }]
});
