Ext.define('MdCarbillModule.store.PrintSet', {
    extend: 'Ext.data.Store',
    model: 'MdCarbillModule.model.PrintsetModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/printgroupList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'cdescrip',
            totalProperty: 'totalCount'
        }
    }
});