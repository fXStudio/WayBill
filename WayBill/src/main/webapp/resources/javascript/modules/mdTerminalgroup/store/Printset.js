Ext.define('MdTerminalGroupModule.store.Printset', {
    extend: 'Ext.data.Store',
    model: 'MdTerminalGroupModule.model.PrintsetModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/printsetList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});