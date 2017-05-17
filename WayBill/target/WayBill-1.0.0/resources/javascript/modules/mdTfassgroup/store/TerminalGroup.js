Ext.define('MdTfassGroupModule.store.TerminalGroup', {
    extend: 'Ext.data.Store',
    model: 'MdTfassGroupModule.model.TerminalGroupModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/tfassGroupList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});