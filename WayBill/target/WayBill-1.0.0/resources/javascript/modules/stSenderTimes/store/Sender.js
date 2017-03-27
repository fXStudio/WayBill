Ext.define('StSenderTimesModule.store.Sender', {
    extend: 'Ext.data.Store',
    model: 'StSenderTimesModule.model.SenderModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/stSenderTimesList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});