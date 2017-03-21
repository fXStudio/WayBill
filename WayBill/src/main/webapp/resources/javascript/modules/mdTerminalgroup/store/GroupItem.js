Ext.define('MdTerminalGroupModule.store.GroupItem', {
    extend: 'Ext.data.Store',
    model: 'MdTerminalGroupModule.model.GroupItemModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        api: {
            read: 'services/groupItemList',
            destroy: 'services/delGroupItem'
        },
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});