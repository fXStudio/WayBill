Ext.define('MdOrderModule.view.MdOrderForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mdorderform',
	
    border: false, // 不显示边线
    defaults: { // 组件的默认样式配置
    	xtype: 'textfield',
        labelWidth: 70, // label的默认宽度
        labelAlign: 'right',
        cls: 'fxstudio-window-inner-margin3',
        labelStyle: 'margin-top:5px;',
        anchor: "98%"
    },
    items: [{
        fieldLabel: '主键',
        name: 'id',
        hidden: true,
        hideLabel: true
    }, {
        name: 'status',
        value: '已创建未扫描',
        hidden: true,
        hideLabel: true
    },{
        id: 'destination',
        xtype: 'combobox',
        fieldLabel: '客户',
        name: 'destination',
        store: Ext.create('MdOrderModule.store.Destination'),
        displayField: 'destination',
        valueField: 'id',
	    editable: false,
        allowBlank: false
    }, {
        fieldLabel: '发货时间',
        name: 'sendDate',                    
        xtype: 'datefield',
        format: 'Y-m-d H:i',
        submitFormat: 'Y-m-d H:i',
        value: new Date(),
        allowBlank: false
    }, {
        fieldLabel: '订单号',
        name: 'orderno',
        selectOnFocus: true,
        allowBlank: true
    }, {
        fieldLabel: '车牌号',
        xtype: 'combobox',
        name: 'car',
        allowBlank: true,
        store: Ext.create('MdOrderModule.store.Car'),
        displayField: 'car',
        valueField: 'car',
	    editable: false,
	    listConfig: {
	        getInnerTpl: function() {
	            return '<div data-qtip="{car}. {destination}">{car} <b style="margin-left:10px;">[ {destination} ]</b></div>';
	        }
	    }
    }]
});