Ext.define('MdCarbillModule.view.MdCarbillForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mdcarbillform',
	
    border: false, // 不显示边线
    defaults: { // 组件的默认样式配置
    	xtype: 'textfield',
        labelWidth: 70, // label的默认宽度
        labelAlign: 'top',
        cls: 'fxstudio-window-inner-margin3',
        labelStyle: 'margin-top:5px;padding-left:5px;',
        anchor: "100%"
    },
    items: [{
        fieldLabel: '零件单号',
        hidden: true,
        name: 'pageno',
        id: 'pagenos'
    }, {
        fieldLabel: '要装载的零件',
        xtype: 'textareafield',
        labelWidth: 90, 
        name: 'items',
        id: 'items',
        rows: 10,
        readOnly:true
    }, {
        fieldLabel: '物流门',
        labelAlign: 'left',
        xtype: 'combobox',
        name: 'doorno',
        id: 'door',
        allowBlank: false,
        store: Ext.create('MdCarbillModule.store.Door'),
        displayField: 'name',
        valueField: 'name',
	    editable: false
    }, {
        fieldLabel: '车牌号',
        labelAlign: 'left',
        xtype: 'combobox',
        name: 'car',
        id: 'car',
        allowBlank: false,
        store: Ext.create('MdCarbillModule.store.Car'),
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