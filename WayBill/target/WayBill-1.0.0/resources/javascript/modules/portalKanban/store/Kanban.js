Ext.define('PortalKanbanModule.store.Kanban', {
    extend: 'Ext.data.Store',
    model: 'PortalKanbanModule.model.KanbanModel',
    
    autoLoad: false,
    proxy: {
        type : 'ajax',
        actionMethods: { read: 'POST' },
        url : 'services/kanbanList',//请求
        reader: {
            type: 'json',
            root: 'items',
            idProperty: 'id',
            totalProperty: 'totalCount'
        }
    },
    groupField: 'car'
});