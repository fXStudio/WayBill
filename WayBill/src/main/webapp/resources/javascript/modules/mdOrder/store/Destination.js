Ext.define('MdOrderModule.store.Destination', {
    extend: 'Ext.data.Store',
    model: 'MdOrderModule.model.DestinationModel',
    
    autoLoad: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/destinationList',//请求
        reader: {
            type: 'json'
        }
    }
})