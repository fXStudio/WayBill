Ext.define('MdOrderModule.view.OrderGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ordergrid',

    multiSelect: true,
    minHeight: 200,
	
    columns: [{ 
    	xtype: 'rownumberer',
        header: '序号',
    	width: 60
	}, {
        header: '客户',
        width: 120,
        dataIndex: 'ordertype'
    }, {
        header: '订单号',
        width: 120,
        dataIndex: 'orderno'
    }, {
        header: '发货时间',
        width: 140,
        dataIndex: 'sendDate'
    }, {
        header: '车牌号',
        width: 120,
        dataIndex: 'car'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
    	var me = this;
        // Create Store Object
        var store = Ext.create('MdOrderModule.store.Order');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [ {
                    text: '确认发运',
                    hidden: true,
                    iconCls: 'commit_ok',
                    action: 'send'
                }, {
                    text: '添加',
                    iconCls: 'add',
                    action: 'add'
                }, {
                    text: '修改',
                    iconCls: 'update',
                    action: 'modify'
                }, {
                    text: '删除',
                    iconCls: 'del',
                    action: 'del'
                }, {
                    text: '打印',
                    iconCls: 'printer',
                    action: 'print'
                }, '->', {
                    xtype: 'combobox',
                    fieldLabel: '客户',
                    labelWidth: 45,
                    name: 'destination',
                    width: 160,
                    store: Ext.create('MdOrderModule.store.Destination'),
                    displayField: 'destination',
                    valueField: 'destination',
                    listeners: {
                    	change: function(obj, newval, oldval){
                    		store.filter({
    	                        filterFn: function(item) {
    	                            return  !obj.getValue() || item.get("ordertype") === obj.getValue(); 
    	                        }
    	                    });
            	        	me.getSelectionModel().deselectAll();
            	        	me.getSelectionModel().select(0);
                    	}
                    }
                }, Ext.create('Ext.form.ComboBox', {
                    fieldLabel: '状态',
                    labelWidth: 45, // label的默认宽度
                    labelAlign: 'right',
                    width: 180,
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                    	autoLoad: true,
                        fields: ['id', 'status'],
                        data : [
                            {"id": "1", "status": "已创建未扫描"},
                            {"id": "2", "status": "已扫描未完成"},
                            {"id": "3", "status": "已扫描未发运"}
                        ]
                    }),
                    value: '已创建未扫描',
                    name: 'dtype',
                    displayField: 'status',
                    valueField: 'status',
                    listeners: {
                    	change: function(obj, newval, oldval){
                    		store.load({params: {
                    			status: newval
                    		}});
                    		me.down('button[action=send]').setVisible(newval === '已扫描未发运');
                    		Ext.each(['button[action=add]', 'button[action=modify]', 'button[action=del]'], function(val, index) {
                        		me.down(val).setVisible(newval === '已创建未扫描');
                    		});
                    	}
                    }
                })]
            }),
            bbar: ['->', '查询订单',{
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