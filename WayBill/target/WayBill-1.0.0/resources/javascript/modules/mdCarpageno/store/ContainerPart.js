Ext.define('MDCarpagenoModule.store.ContainerPart', {
    extend: 'Ext.data.Store',
    model: 'MDCarpagenoModule.model.ContainerPartModel',
    
    autoLoad: false,
    autoDestroy: true,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/containerPartList',
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    }
});