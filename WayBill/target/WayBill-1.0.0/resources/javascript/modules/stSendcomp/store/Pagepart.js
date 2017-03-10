Ext.define('STSendCompModule.store.Pagepart', {
    extend: 'Ext.data.Store',
    model: 'STSendCompModule.model.PagepartModel',
    
    autoLoad: false,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/pagepartList',
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'partname',
            totalProperty: 'totalCount'
        }
    }
});