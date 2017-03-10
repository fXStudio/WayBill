Ext.define('MdCarbillModule.store.Carbill', {
    extend: 'Ext.data.Store',
    model: 'MdCarbillModule.model.MdCarbillModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carBillList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'cpageno',
            totalProperty: 'totalCount'
        }
    }
});