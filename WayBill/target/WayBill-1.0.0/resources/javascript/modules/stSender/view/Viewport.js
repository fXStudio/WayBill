Ext.define('StSenderModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['StSenderModule.view.StSenderGrid'],

    layout: 'fit',
    items: {
        xtype: 'stsendergrid'
    }
});
