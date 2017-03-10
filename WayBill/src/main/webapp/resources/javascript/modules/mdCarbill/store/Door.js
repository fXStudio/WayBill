Ext.define('MdCarbillModule.store.Door', {
    extend: 'Ext.data.Store',
    model: 'MdCarbillModule.model.DoorModel',
    
    autoLoad: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/doorCombox',//请求
        reader: {
            type: 'json'
        }
    }
})