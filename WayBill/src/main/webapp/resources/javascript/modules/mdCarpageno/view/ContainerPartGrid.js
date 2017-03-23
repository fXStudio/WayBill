Ext.define('MDCarpagenoModule.view.ContainerPartGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.containerpartgrid',

    selModel: { checkOnly: true },
    defaults: { sortable: true },
	enableColumnHide: false,
	sortableColumns: false,
	enableColumnMove: false,
    columns: [{ 
    	xtype: 'rownumberer',
    	align: 'center',
        header: '序号',
    	width: 50
	}, {
        header: '零件名称',
        width: 180,
        dataIndex: 'partno'
    }, {
        header: '数量',
        width: 100,
        dataIndex: 'partcount'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Copy properties to Origin Object
        Ext.apply(this, { store: Ext.create('MDCarpagenoModule.store.ContainerPart') });
        
        // Call Parent Constructor
        this.callParent(arguments);
    }
});