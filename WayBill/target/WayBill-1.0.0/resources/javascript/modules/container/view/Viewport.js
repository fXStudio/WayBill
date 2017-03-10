Ext.define('MainModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MainModule.view.TreePanel',
        'MainModule.view.TabPanel'
    ],

    layout: 'border',
    items: [{
	   xtype: 'maintreepanel',
       region: 'west'
    }, {
       xtype: 'maintabpanel',
       region: 'center'
    }]
});
