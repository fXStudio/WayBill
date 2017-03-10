Ext.define('ScanLocalClientModule.store.Orderpart', {
    extend: 'Ext.data.Store',
    model: 'ScanLocalClientModule.model.OrderpartModel',
    
    autoLoad: false,
    autoSync: false,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        api: {
            read: 'services/scanpartList'
        },
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});