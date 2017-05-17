Ext.define('MdTfassGroupModule.view.GroupitemGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.groupitemgrid',

    xtype: 'cell-editing',
	sortableColumns: false,
	enableColumnMove: false,
	enableColumnHide: false,

    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        var store = Ext.create('MdTfassGroupModule.store.GroupItem');

        // Copy properties to Origin Object
        Ext.apply(this, {
        	store: store,
            columns: [{
                xtype: 'actioncolumn',
                width: '12',
                iconCls: 'del',
                align: 'center',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
	                Ext.MessageBox.confirm('确认删除', '确定要从分组中移除【' + record.data.cdescrip + '】吗?', function(res) {
	                    if (res === 'yes') { // 用户确认要执行删除操作
                            store.remove(record);
                            store.sync();
	                    }
	                });
                }
            },  {
                header: '配货单类型',
                flex: 1,
                dataIndex: 'cdescrip'
            }],
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                    text: '添      加',
                    id: 'addBtn',
                    iconCls: 'add',
                    action: 'addItem',
                    width:120,
                    disabled: true
                }, {
                	xtype: 'textfield',
                	id: 'orderid',
                	name: 'orderid',
                	hidden: true
                }]
            })
        });
        this.callParent(arguments);
    }
});