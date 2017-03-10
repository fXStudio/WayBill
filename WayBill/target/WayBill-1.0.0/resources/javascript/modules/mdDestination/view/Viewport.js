Ext.define('MdDestinationModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['MdDestinationModule.view.MdDestinationGrid'],

    layout: 'fit',
    items: {
        xtype: 'mddestinationgrid'
    }
});
