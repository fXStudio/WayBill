Ext.define('MdTfassGroupModule.store.GroupItem', {
    extend: 'Ext.data.Store',
    model: 'MdTfassGroupModule.model.GroupItemModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        api: {
            read: 'services/tfassItemList',
            destroy: 'services/delTfassGroupItem'
        },
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});