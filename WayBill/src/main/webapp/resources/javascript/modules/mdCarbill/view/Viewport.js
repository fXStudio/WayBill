Ext.define('MdCarbillModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MdCarbillModule.view.MdCarbillGrid',
        'MdCarbillModule.view.TfassnameGrid'
   ],

    layout: 'border',
    items: [{
        xtype: 'tfassnamegrid',
        region: 'west',
        width: 180
    }, {
        xtype: 'mdcarbillgrid',
        region: 'center'
    }]
});
