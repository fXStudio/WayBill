Ext.define('MdOrderModule.store.TerminalPartInfo', {
    extend: 'Ext.data.Store',
    model: 'MdOrderModule.model.TerminalPartInfoModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/terminalPartInfoList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
})