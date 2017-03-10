Ext.define('MdCarbillModule.store.Car', {
    extend: 'Ext.data.Store',
    model: 'MdCarbillModule.model.CarModel',
    
    autoLoad: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carCombox',//请求
        reader: {
            type: 'json'
        }
    }
})