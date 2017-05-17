Ext.define('MdTfassGroupModule.store.Printset', {
    extend: 'Ext.data.Store',
    model: 'MdTfassGroupModule.model.PrintsetModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/tfassprintList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});