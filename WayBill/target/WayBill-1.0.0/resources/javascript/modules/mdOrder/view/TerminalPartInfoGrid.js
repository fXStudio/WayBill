Ext.define('MdOrderModule.view.TerminalPartInfoGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.terminalpartinfogrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        var store = Ext.create('MdOrderModule.store.TerminalPartInfo');

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            selType: 'checkboxmodel',
            columns: [ {
                header: '总成号',
                width: 160,
                dataIndex: 'cqadno'
            },   {
                header: '总成描述',
                width: 160,
                dataIndex: 'cdesc'
            }, {
                header: '标包数量',
                width: 90,
                dataIndex: 'cquantity'
            }, {
                header: '是否扫描',
                width: 90,
                dataIndex: 'isscan',        
                renderer: function (value) {return value === 1 ? '是' : '--';},
            }],
            bbar: ['->', '查询零件',{
                xtype: 'textfield',
                name: 'searchField',
                selectOnFocus: true,
                hideLabel: true,
                width: 200,
                listeners: {
                	specialkey: function(field, e){
    	                if (e.getKey() == e.ENTER) {
    	                    store.filter({
    	                        filterFn: function(item) {
    	                            return !field.getValue() || 
    	                                   item.get("cqadno") && item.get("cqadno").indexOf(field.getValue()) > -1; 
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