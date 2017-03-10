Ext.define('MDCarpagenoModule.view.CarGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.cargrid',

	tbar: [ '<strong>整车发货</strong>' ],
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
        header: '装车时间',
        width: 180,
        dataIndex: 'recorddate'
    }, {
        header: '车号',
        width: 90,
        dataIndex: 'car'
    }, {
        header: '门号',
        width: 90,
        dataIndex: 'doorno'
    }],
    
    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('MDCarpagenoModule.store.Car');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: ['->', {
                    text: '确认发货',
                    action: 'submit'
                }, '|',  {
                    text: '撤销装载',
                    iconCls: 'del',
                    action: 'cancel'
                }]
            }),
            bbar: ['->', '查询整车',{
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