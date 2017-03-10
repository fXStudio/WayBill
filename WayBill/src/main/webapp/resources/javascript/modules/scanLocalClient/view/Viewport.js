Ext.define('ScanLocalClientModule.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    items: [ Ext.create('ScanLocalClientModule.view.ScanClientGrid', {
        	width:300,
        	height:228,
        	frame: true
    }),
	    Ext.create('ScanLocalClientModule.view.OrderpartGrid', {
	    	hidden:true,
	    	width:300,
	    	height:228,
	    	frame: true
	})]
});
