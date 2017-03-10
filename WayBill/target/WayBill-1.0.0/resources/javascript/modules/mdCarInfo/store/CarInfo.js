Ext.define('MdCarInfoModule.store.CarInfo', {
    extend: 'Ext.data.Store',
    model: 'MdCarInfoModule.model.MdCarInfoModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});