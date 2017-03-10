Ext.define('PortalKanbanModule.view.DoorOneGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dooronegrid',
    requires: [
         'Ext.grid.feature.Grouping'
    ],

    title: '<h1>1号门</h1>',
    titleAlign: 'center',
    selModel: { checkOnly: true },
    hideHeaders: true,

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<h2>{name}</h2>',
        hideGroupedHeader: true,
        startCollapsed: false,
        collapsible: false,
        id: 'restaurantGrouping'
    }],
    
    columns: [{
        flex:1,
        dataIndex: 'car'
    },{
        flex: .8,
        dataIndex: 'cdescrip'
    },{
        flex: .2,
        dataIndex: 'code'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Copy properties to Origin Object
        Ext.apply(this, {
            store: Ext.create('PortalKanbanModule.store.Kanban')
        });
        // Call Parent Constructor
        this.callParent(arguments);
    }
});