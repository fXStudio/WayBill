Ext.define('MdPartInfoModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['MdPartInfoModule.view.MdPartInfoGrid'],

    layout: 'fit',
    items: {
        xtype: 'mdpartinfogrid'
    }
});
