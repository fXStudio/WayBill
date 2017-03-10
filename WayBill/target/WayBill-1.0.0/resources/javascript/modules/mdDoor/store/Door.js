Ext.define('MdDoorModule.store.Door', {
    extend: 'Ext.data.Store',
    model: 'MdDoorModule.model.DoorModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/doorList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});