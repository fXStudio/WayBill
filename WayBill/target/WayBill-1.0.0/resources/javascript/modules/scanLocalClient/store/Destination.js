Ext.define('ScanLocalClientModule.store.Destination', {
    extend: 'Ext.data.Store',
    model: 'ScanLocalClientModule.model.DestinationModel',
    
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