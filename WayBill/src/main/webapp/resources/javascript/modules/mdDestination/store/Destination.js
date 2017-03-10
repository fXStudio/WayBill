Ext.define('MdDestinationModule.store.Destination', {
    extend: 'Ext.data.Store',
    model: 'MdDestinationModule.model.DestinationModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/destList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});