Ext.define('STSendCompModule.view.PagepartGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.pagepartgrid',

	tbar: [ '<strong>整车发货完成-总成匹配扫描详细信息</strong>' ],
	enableColumnHide: false,
	sortableColumns: false,
	enableColumnMove: false,
    columns: [{ 
    	xtype: 'rownumberer',
    	align: 'center',
        header: '序号',
    	width: 50
	}, {
        header: '零件号',
        width: 180,
        dataIndex: 'partname'
    }, {
        header: '底盘号',
        width: 180,
        dataIndex: 'vin'
    }, {
        header: '方向盘/气囊序列号',
        width: 180,
        dataIndex: 'partseq'
    }, {
        header: '批次',
        width: 160,
        dataIndex: 'dpcode'
    }, {
        header: '日期',
        width: 160,
        dataIndex: 'dpdate'
    }, {
        header: '流水号',
        width: 160,
        dataIndex: 'dpseqnum'
    }, {
        header: '扫描零件号扫操作员',
        width: 160,
        dataIndex: 'emp'
    }, {
        header: '扫描零件号时间',
        width: 160,
        dataIndex: 'recorddate'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Copy properties to Origin Object
        Ext.apply(this, { store: Ext.create('STSendCompModule.store.Pagepart') });
        
        // Call Parent Constructor
        this.callParent(arguments);
    }
});