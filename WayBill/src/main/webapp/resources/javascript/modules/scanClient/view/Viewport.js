Ext.define('ScanClientModule.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    items: [ Ext.create('ScanClientModule.view.ScanClientGrid', {
        	width:300,
        	height:228,
        	frame: true
    }),
	    Ext.create('ScanClientModule.view.OrderpartGrid', {
	    	hidden:true,
	    	width:300,
	    	height:228,
	    	frame: true
	})]
});
