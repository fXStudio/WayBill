Ext.define('StOrderModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
               'StOrderModule.view.OrderGrid',
               'StOrderModule.view.OrderpartGrid'
    ],

    layout: 'border',
    items: [{
        xtype: 'ordergrid',
        region: 'north',
        resizable: false,
        height: 200
    },{
        xtype: 'orderpartgrid',
        region: 'center'
    }]
});
