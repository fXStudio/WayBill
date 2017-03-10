Ext.define('StOrderModule.view.KanbanOrderGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.kanbanordergrid',

    multiSelect: true,
	
    columns: [{
        header: '客户',
        flex: 1,
        dataIndex: 'ordertype'
    }, {
        header: '运单号',
        flex: 1,
        dataIndex: 'orderno'
    }, {
        header: '发货时间',
        flex: 1,
        dataIndex: 'sendDate'
    }, {
        header: '车牌号',
        flex: 1,
        dataIndex: 'car'
    }],

    /**
     * Component Init
     */
    initComponent: function() {
    	var me = this;
        // Copy properties to Origin Object
        Ext.apply(this, {
        });
        // Call Parent Constructor
        this.callParent(arguments);
    }
});