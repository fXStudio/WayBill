Ext.define('ScanClientModule.store.Destination', {
    extend: 'Ext.data.Store',
    model: 'ScanClientModule.model.DestinationModel',
    
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