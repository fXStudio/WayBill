Ext.define('StSenderModule.store.Sender', {
    extend: 'Ext.data.Store',
    model: 'StSenderModule.model.SenderModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/stSenderList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});