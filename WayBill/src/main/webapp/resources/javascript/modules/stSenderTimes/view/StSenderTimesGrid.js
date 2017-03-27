Ext.define('StSenderTimesModule.view.StSenderTimesGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.stsendertimesgrid',
	
    enableColumnHide: false,
	sortableColumns: false,
	enableColumnMove: false,
	
    selModel: { checkOnly: true },
    defaults: { sortable: true },
    columns: [{ 
    	xtype: 'rownumberer',
    	align: 'center',
        header: '序号',
    	width: 50
	}, {
        header: '客户',
        width: 140,
        dataIndex: 'destination'
    }, {
        header: '车辆',
        width: 120,
        dataIndex: 'car'
    }, {
        header: '趟次',
        width: 100,
        dataIndex: 'times'
    }, {
        header: '类型',
        width: 100,
        dataIndex: 'type'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('StSenderTimesModule.store.Sender');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                	name: 'startDate',
            		fieldLabel: '时间',
            		labelWidth: 35,
            		labelAlign: 'right',
    	           	id: 'beginDate',
    	   	        xtype: 'datefield',
    	   	        format: 'Y-m-d H:i',
    	   	        allowBlank: false,
    	   	        width: 220,
    	   			value: Ext.Date.add(new Date(), Ext.Date.DAY, -1)
            	}, {
                	name: 'endDate',
            		fieldLabel: '至 ',
            		labelWidth: 30,
            		labelAlign: 'right',
    	   	        id: 'endDate',
    	   	        allowBlank: false,
    	   	        xtype: 'datefield',
    	   	        format: 'Y-m-d H:i',
    	   	        width: 220,
    	   			value: new Date()
    	   	   }, '|' , {
    	   		   	name: 'sender',
			        xtype: 'checkbox',
			        fieldLabel: '准时化',
		            labelWidth: 50,
		            labelAlign: 'right',
			        checked: true
			   }, {
               		name: 'order',
			        xtype: 'checkbox',
			        fieldLabel: '运单',
		            labelWidth: 50,
		            labelAlign: 'right',
			        checked: true
			   }, '->', {
    	   		   text: '查询报表',
    	   		   iconCls: 'search',
    	   		   action: 'search'
    	   	   }]
            }),
            bbar: [{
  	   		   text: '导出报表',
	   		   iconCls: 'excel',
	   		   disabled: true,
	   		   action: 'export'
	   	   },'->', {
                xtype: 'combobox',
                fieldLabel: '客户',
                labelWidth: 45,
                name: 'destination',
                store: Ext.create('StSenderTimesModule.store.Destination'),
                displayField: 'destination',
                valueField: 'destination',
                listeners: {
                	change: function(obj, newval, oldval){
                		store.filter({
	                        filterFn: function(item) {
	                            return  !obj.getValue() || item.get("destination") === obj.getValue(); 
	                        }
	                    });
                	}
                }
            }, '查询名称',{
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