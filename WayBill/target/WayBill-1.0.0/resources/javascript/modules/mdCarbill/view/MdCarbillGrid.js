Ext.define('MdCarbillModule.view.MdCarbillGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.mdcarbillgrid',

    multiSelect: true,
	
    columns: [{
        header: '单号',
        width: 110,
        dataIndex: 'cpageno'
    }, {
        header: '零件名称',
        width: 140,
        dataIndex: 'name'
    }, {
        header: '编码',
        width: 70,
        dataIndex: 'code'
    }, {
        header: '打印时间',
        width: 150,
        dataIndex: 'printdate'
    }, {
        header: '扫描完成时间',
        width: 130,
        dataIndex: 'partdate'
    }, {
        header: '装车时间',
        width: 130,
        dataIndex: 'cardate'
    }, {
        header: '车牌号',
        width: 90,
        dataIndex: 'car'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
        // Create Store Object
        var store = Ext.create('MdCarbillModule.store.Carbill');

        // Copy properties to Origin Object
        Ext.apply(this, {
            store: store,
            selType: 'checkboxmodel',
            selModel: {
            	allowDeselect: true,
                mode: "SIMPLE", 
                enableKeyNav: false
            },
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                    text: '准备装载',
                    iconCls: 'add',
                    action: 'add'
                },  '->', '<span>已选中: <span id="selectedCount" style="font-weight:bolder;">0</span> 条记录</span>']
            })
        });
        // Call Parent Constructor
        this.callParent(arguments);
    }
});