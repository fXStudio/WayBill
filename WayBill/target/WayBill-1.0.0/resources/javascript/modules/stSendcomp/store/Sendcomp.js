Ext.define('STSendCompModule.store.Sendcomp', {
    extend: 'Ext.data.Store',
    model: 'STSendCompModule.model.SendcompModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/sendcompList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});