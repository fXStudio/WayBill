Ext.define('MdTfassGroupModule.view.PrintsetGrid', {
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
        var store = Ext.create('MdTfassGroupModule.store.Printset');

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            selType: 'checkboxmodel',
            selModel: {
            	allowDeselect: true,
                mode: "SIMPLE", 
                enableKeyNav: false
            },
            columns: [{
                header: '零件描述',
                flex: 1,
                dataIndex: 'ccartypedesc'
            },   {
                header: '零件名称',
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