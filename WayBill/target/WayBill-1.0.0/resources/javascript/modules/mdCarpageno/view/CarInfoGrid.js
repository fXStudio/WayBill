Ext.define('MDCarpagenoModule.view.CarInfoGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.carinfogrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        var store = Ext.create('MDCarpagenoModule.store.CarInfo');

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            selType: 'checkboxmodel',
            selModel: {
            	allowDeselect: true,
                mode: "SINGLE", 
                enableKeyNav: false
            },
            columns: [{ 
            	xtype: 'rownumberer',
            	align: 'center',
                header: '序号',
            	width: 50
        	}, {
                header: '车牌号',
                width: 120,
                dataIndex: 'car'
            }, {
                header: '目的地',
                width: 160,
                dataIndex: 'destination'
            }, {
                header: '备注',
                width: 240,
                dataIndex: 'remark'
            }],
            bbar: ['->', '查询车辆',{
                xtype: 'textfield',
                selectOnFocus: true,
                hideLabel: true,
                width: 200,
                listeners: {
                	specialkey: function(field, e){
    	                if (e.getKey() == e.ENTER) {
    	                    store.filter({
    	                        filterFn: function(item) {
    	                            return !field.getValue() || 
    	                                   item.get("car") && item.get("car").indexOf(field.getValue()) > -1; 
    	                        }
    	                    });
    	                }
    	            }
                }
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
        this.callParent(arguments);
    }
});