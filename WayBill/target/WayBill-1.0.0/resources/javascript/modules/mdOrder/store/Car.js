Ext.define('MdOrderModule.store.Car', {
    extend: 'Ext.data.Store',
    model: 'MdOrderModule.model.CarModel',
    
    autoLoad: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carSelList',//请求
        reader: {
            type: 'json'
        }
    }
})