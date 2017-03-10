Ext.define('StOrderModule.view.KanbanPartGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.kanbangrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;

        // Copy properties to Origin Object
        Ext.apply(this, {
            columns: [{ 
            	xtype: 'rownumberer',
                header: '序号',
            	width: 60
        	}, {
                header: '总成号',
                flex: 1,
                dataIndex: 'partno'
            }, {
                header: '总成描述',
                flex: 1,
                dataIndex: 'partdesc'
            }, {
                header: '运单号',
                width: 160,
                dataIndex: 'orderno'
            },  {
                header: '包装数',
                dataIndex: 'pkgcount',
                width: 90,
                align: 'right'
            }, {
                header: '数量',
                dataIndex: 'totalcount',
                width:90,
                align: 'right'
            }]
        });
        this.callParent(arguments);
    }
});