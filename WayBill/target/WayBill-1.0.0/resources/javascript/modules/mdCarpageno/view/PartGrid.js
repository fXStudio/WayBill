Ext.define('MDCarpagenoModule.view.PartGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.partgrid',

	tbar: [ '<strong>装载配货单详细信息</strong>' ],
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
        header: '配置单号',
        width: 120,
        dataIndex: 'pageno'
    }, {
        header: '零件名称',
        width: 240,
        dataIndex: 'name'
    }, {
        header: '架子号',
        width: 70,
        dataIndex: 'code'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Copy properties to Origin Object
        Ext.apply(this, { store: Ext.create('MDCarpagenoModule.store.Part') });
        
        // Call Parent Constructor
        this.callParent(arguments);
    }
});