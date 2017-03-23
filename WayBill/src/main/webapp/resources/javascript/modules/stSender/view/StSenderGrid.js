Ext.define('StSenderModule.view.StSenderGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.stsendergrid',
	
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
        header: '名称',
        width: 180,
        dataIndex: 'partno'
    }, {
        header: '数量',
        width: 100,
        dataIndex: 'partcount'
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
        var store = Ext.create('StSenderModule.store.Sender');

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
    	   	        width: 180,
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
    	   	        width: 180,
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
            bbar: ['->', '查询名称',{
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