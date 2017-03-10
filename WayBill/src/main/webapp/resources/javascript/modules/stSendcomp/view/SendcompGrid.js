Ext.define('STSendCompModule.view.SendcompGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.sendcompgrid',

	tbar: [ '<strong>整车发货完成-配货单追踪</strong>' ],
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
        header: '配货单号',
        width: 120,
        dataIndex: 'pageno'
    }, {
        header: '总成匹配完成操作员',
        width: 160,
        dataIndex: 'cpemp'
    }, {
        header: '装载完成操作员',
        width: 160,
        dataIndex: 'csemp'
    }, {
        header: '车号',
        width: 120,
        dataIndex: 'cscar'
    }, {
        header: '发货操作员',
        width: 140,
        dataIndex: 'csoutemp'
    }, {
        header: '发货时间',
        width: 140,
        dataIndex: 'csoutrecorddate'
    }, {
        header: '总成匹配完成时间',
        width: 160,
        dataIndex: 'psdate'
    }, {
        header: '车辆装载完成时间',
        width: 160,
        dataIndex: 'csdate'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('STSendCompModule.store.Sendcomp');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            bbar: ['->', '查询发货信息',{
	                xtype: 'textfield',
	                name: 'searchField',
	                selectOnFocus: true,
	                hideLabel: true,
	                width: 200
	           }, '|', {
	          iconCls: 'x-tbar-loading',
	          style: 'margin-right:20px',
	          listeners: {
	              click: function() {
	                  store.reload();
	              }
	          }
	        }]
        });
        // Call Parent Constructor
        this.callParent(arguments);
    }
});