Ext.define('ScanClientModule.store.Orderpart', {
    extend: 'Ext.data.Store',
    model: 'ScanClientModule.model.OrderpartModel',
    
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