Ext.define('MDCarpagenoModule.store.Car', {
    extend: 'Ext.data.Store',
    model: 'MDCarpagenoModule.model.CarModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carpagenoList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});