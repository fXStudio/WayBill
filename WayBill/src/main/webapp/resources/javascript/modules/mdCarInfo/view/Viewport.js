Ext.define('MdCarInfoModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['MdCarInfoModule.view.MdCarInfoGrid'],

    layout: 'fit',
    items: {
        xtype: 'mdcarinfogrid'
    }
});
