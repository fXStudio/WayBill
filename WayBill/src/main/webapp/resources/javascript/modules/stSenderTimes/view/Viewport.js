Ext.define('StSenderTimesModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['StSenderTimesModule.view.StSenderTimesGrid'],

    layout: 'fit',
    items: {
        xtype: 'stsendertimesgrid'
    }
});
