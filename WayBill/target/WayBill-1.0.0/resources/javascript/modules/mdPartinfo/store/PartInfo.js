Ext.define('MdPartInfoModule.store.PartInfo', {
    extend: 'Ext.data.Store',
    model: 'MdPartInfoModule.model.MdPartInfoModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/partinfoList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});