Ext.define('PortalKanbanModule.view.DoorThreeGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.doorthreegrid',
    requires: [
           'Ext.grid.feature.Grouping'
    ],

    title: '<h1>3号门</h1>',
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