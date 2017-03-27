Ext.define('MdTerminalGroupModule.view.PrintsetGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.printsetgrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        var store = Ext.create('MdTerminalGroupModule.store.Printset');

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            selType: 'checkboxmodel',
            columns: [{
                header: '配货单类型',
                flex: 1,
                dataIndex: 'cdescrip'
            }],
            bbar: ['->', '查询零件',{
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
    	                                   item.get("cdescrip") && item.get("cdescrip").indexOf(field.getValue()) > -1; 
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