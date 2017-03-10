Ext.define('MdDoorModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['MdDoorModule.view.MdDoorGrid'],

    layout: 'fit',
    items: {
        xtype: 'mddoorgrid'
    }
});
