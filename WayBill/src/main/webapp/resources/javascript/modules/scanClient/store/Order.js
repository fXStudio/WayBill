Ext.define('ScanClientModule.store.Order', {
    extend: 'Ext.data.Store',
    model: 'ScanClientModule.model.OrderModel',
    
    autoLoad: false,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/createdOrderList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});