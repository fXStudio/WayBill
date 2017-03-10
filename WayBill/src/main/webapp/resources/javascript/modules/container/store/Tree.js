Ext.define('MainModule.store.Tree', {
    extend: 'Ext.data.TreeStore',
    model: 'MainModule.model.TreeModel',
    
    autoLoad: true,
    autoDestroy: true,
    root: { expanded: true },
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'GET' },
        url : 'javascript/nodes.json',//请求  
    }
});