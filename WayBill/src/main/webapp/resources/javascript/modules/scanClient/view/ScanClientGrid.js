Ext.define('ScanClientModule.view.ScanClientGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.scanclientgrid',

    enableColumnHide: false,
	sortableColumns: false,
	enableColumnMove: false,
    columns: [{ 
        dataIndex: 'id',
        header: 'MES运单',
    	width: 90
	}, {
        header: '发货时间',
        width: 125,
        dataIndex: 'sendDate'
    }, {
        header: '客户',
        width: 100,
        dataIndex: 'ordertype'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
    	var me = this;
        var store = Ext.create('ScanClientModule.store.Order');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            bbar: Ext.create('Ext.toolbar.Toolbar', {
                items: ['->',  '查询运单',{
	                xtype: 'textfield',
	                id: 'searchField',
	                selectOnFocus: true,
	                hideLabel: true,
	                width: 160,
	                listeners: {
	                	specialkey: function(field, e){
	    	                if (e.getKey() == e.ENTER) {
	    	                    store.filter({
	    	                        filterFn: function(item) {
	    	                            return !field.getValue() || 
	    	                                   item.get("id") && item.get("id").toString().indexOf(field.getValue()) > -1; 
	    	                        }
	    	                    });
	    	                }
	    	            }
	                }
	           },{
        	          iconCls: 'x-tbar-loading',
        	          style: 'margin-right:20px',
        	          listeners: {
        	              click: function() {
        	                  store.reload();
        	              }
        	          }
        	        }]
            })
        });
        this.callParent(arguments);
    }
});