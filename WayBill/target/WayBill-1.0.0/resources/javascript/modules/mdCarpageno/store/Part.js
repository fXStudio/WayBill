Ext.define('MDCarpagenoModule.store.Part', {
    extend: 'Ext.data.Store',
    model: 'MDCarpagenoModule.model.PartModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/carpartList',
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});