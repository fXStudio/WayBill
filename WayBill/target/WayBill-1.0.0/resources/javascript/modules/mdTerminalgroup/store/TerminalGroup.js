Ext.define('MdTerminalGroupModule.store.TerminalGroup', {
    extend: 'Ext.data.Store',
    model: 'MdTerminalGroupModule.model.TerminalGroupModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/groupList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});