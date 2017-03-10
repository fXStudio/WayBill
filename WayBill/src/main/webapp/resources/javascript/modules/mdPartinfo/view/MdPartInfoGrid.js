Ext.define('MdPartInfoModule.view.MdPartInfoGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.mdpartinfogrid',
	
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
        header: '零件名称',
        width: 160,
        dataIndex: 'cqadno'
    }, {
        header: '零件描述',
        width: 160,
        dataIndex: 'cdesc'
    }, {
        header: '包装容量',
        width: 90,
        dataIndex: 'cquantity'
    }, {
        header: '客户',
        width: 140,
        dataIndex: 'destinationId'
    }, {
        header: '是否扫描',
        width: 90,
        dataIndex: 'isscan',
        renderer: function (value) {return value === 1 ? '是' : '--';},
    }],

    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('MdPartInfoModule.store.PartInfo');

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
                }]
            }),
            bbar: ['->', '查询零件',{
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