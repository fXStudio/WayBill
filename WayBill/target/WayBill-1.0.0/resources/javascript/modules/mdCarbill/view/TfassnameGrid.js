Ext.define('MdCarbillModule.view.TfassnameGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.tfassnamegrid',

    multiSelect: true,
    cls: 'partType',
	
    columns: [{
        header: '零件类型',
        flex: 1,
        dataIndex: 'cdescrip'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('MdCarbillModule.store.PrintSet');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            bbar: ['->', {
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