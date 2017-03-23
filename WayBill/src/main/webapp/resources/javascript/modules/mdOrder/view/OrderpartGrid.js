Ext.define('MdOrderModule.view.OrderpartGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.orderpartgrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        var store = Ext.create('MdOrderModule.store.Orderpart');
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false,
        	listeners: {
                cancelEdit: function(rowEditing, context) {
                    if (!context.record.data.id) {
                        store.remove(context.record);
                    }
                    me.down('#addBtn').setDisabled(false);
                },
                edit: function (editor, context){
         		    var mask = new Ext.LoadMask(me, {msg:"数据处理中请稍后......"});
         		    mask.show();
         		    Ext.Ajax.request({
                         url: 'services/orderpartChange',
                         params: context.record.data,
                         method: 'POST',
                         success: function(response, options) {
                         	store.reload();
                         	store.on({
                         		'load': function(){
                    	              mask.hide();
                         		}
                         	});
                         },
                         failure: function(response, action) {
              	             mask.hide();
                             Ext.MessageBox.alert('失败', '操作失败：' + action.result.failureReason);
                         }
                    });
                    me.down('#addBtn').setDisabled(false);
                }
            }
        });

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            plugins: [rowEditing],
            columns: [{
                xtype: 'actioncolumn',
                width: '12',
                iconCls: 'del',
                align: 'center',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    if (!rowEditing.editing) {
                    	rowEditing.executing = true;
    	                Ext.MessageBox.confirm('确认删除', '确定要删除零件【' + record.data.partno + '】信息吗?', function(res) {
    	                    if (res === 'yes') { // 用户确认要执行删除操作
                                store.remove(record);
                                store.sync();
    	                    }
    	                    rowEditing.executing = false;
    	                });
                    }
                }
            }, {
                header: '订单ID',
                dataIndex: 'orderid',
                hidden: true,
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '箱容量',
                dataIndex: 'pkgquantity',
                hidden: true,
                field: {
                    selectOnFocus: true,
                    xtype: 'textfield'
                }
            }, {
                header: '总成号',
                width: 260,
                dataIndex: 'partno',
                field: {
                    xtype: 'textfield',
                    disabled: true
                }
            }, {
                header: '总成描述',
                width: 200,
                dataIndex: 'partdesc',
                field: {
                    xtype: 'textfield',
                    disabled: true
                }
            }, {
                header: '订单号',
                width: 140,
                dataIndex: 'orderno',
                field: {
                    selectOnFocus: true,
                    xtype: 'textfield'
                }
            },  {
                header: '箱数',
                dataIndex: 'pkgcount',
                width: 60,
                align: 'right',
                field: {
                	id: 'pkgcount',
                    xtype: 'numberfield',
                    selectOnFocus: true,
                    allowBlank: false,
                    editable: true,
                    step: 1,
                    minValue: 1,
                    listeners: {
                    	change: function(c, newval){
                    		var record = me.getSelectionModel().getLastSelected();
                    		       record.data.totalcount = (newval * record.data.pkgquantity).toFixed(1);
                    		
                    		Ext.getCmp('totalcount').setValue(record.data.totalcount);
                    		Ext.getCmp('distotalcount').setValue(record.data.totalcount);
                    	}
                    }
                }
            }, {
                header: '零件数量',
                dataIndex: 'totalcount',
                renderer: function(metadata, val, record){
                	return record.get('pkgcount') * record.get('pkgquantity');
                },
                width:90,
                align: 'right',
                field: {
                    xtype: 'textfield',
                    id: 'distotalcount',
                    disabled: true
                }
            }, {
                header: '零件数量',
                hidden: true,
                field: {
                    xtype: 'textfield',
                    id: 'totalcount',
                    readOnly: true,
                    name: 'totalcount'
                }
            }, {
                xtype: 'actioncolumn',
                width: '12',
                iconCls: 'copy',
                align: 'center',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    if (!rowEditing.editing) {
                    	rowEditing.executing = true;
                    	
    	                var item = new MdOrderModule.model.OrderpartModel();
    	                      item.data = Ext.clone(record.data);
    	                      item.data.id = null;
    	                      
    	                var mask = new Ext.LoadMask(me, {msg:"数据处理中请稍后......"});
    	           		       mask.show();
    	           		Ext.Ajax.request({
    	                           url: 'services/orderpartChange',
    	                           params: item.data,
    	                           method: 'POST',
    	                           success: function(response, options) {
	    	                           store.reload();
	    	                           store.on({
	    	                           		'load': function(){
	       	                	                mask.hide();
	    	                	                rowEditing.executing = false;
	    	                           		}
	    	                           	});
    	                           },
    	                           failure: function(response, action) {
  	                	               mask.hide();
    	           	                   rowEditing.executing = false;
    	                               Ext.MessageBox.alert('失败', '操作失败：' + action.result.failureReason);
    	                           }
    	                  });
                    }
                }
            }],
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                    text: '添      加',
                    id: 'addBtn',
                    iconCls: 'add',
                    action: 'addPart',
                    width:120,
                    disabled: true
                }, {
                	xtype: 'textfield',
                	id: 'orderid',
                	name: 'orderid',
                	hidden: true
                }]
            }),
            listeners: {
            	itemclick: function(obj, record, item, index){
            		if(!rowEditing.editing && !rowEditing.executing){
            		    rowEditing.startEdit(index, 0);
                        Ext.getCmp('totalcount').setValue(Ext.getCmp('distotalcount').getValue());
        	            Ext.getCmp('pkgcount').focus(true, 100);
            	    }
            	}
            }
        });
        this.callParent(arguments);
    }
});