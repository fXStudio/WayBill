Ext.define('MdTfassGroupModule.view.MdTerminalGroupGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.mdterminalgroupgrid',
	
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
        dataIndex: 'groupName'
    }, {
        header: '描述',
        width: 240,
        dataIndex: 'remark'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('MdTfassGroupModule.store.TerminalGroup');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                    text: '添加',
                    iconCls: 'add',
                    action: 'add'
                }, {
                    text: '修改',
                    iconCls: 'update',
                    action: 'modify'
                }, '-', {
                    text: '删除',
                    iconCls: 'del',
                    action: 'del'
                }, '->', '查询名称',{
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
            })
        });
        // Call Parent Constructor
        this.callParent(arguments);
    }
});