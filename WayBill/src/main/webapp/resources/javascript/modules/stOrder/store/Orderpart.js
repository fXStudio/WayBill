Ext.define('StOrderModule.store.Orderpart', {
    extend: 'Ext.data.Store',
    model: 'StOrderModule.model.OrderpartModel',
    
    autoLoad: false,
    autoSync: false,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        api: {
            read: 'services/orderpartList',
            destroy: 'services/delOrderpart'
        },
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});