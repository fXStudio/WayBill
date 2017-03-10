Ext.define('MdOrderModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
               'MdOrderModule.view.OrderGrid',
               'MdOrderModule.view.OrderpartGrid'
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
