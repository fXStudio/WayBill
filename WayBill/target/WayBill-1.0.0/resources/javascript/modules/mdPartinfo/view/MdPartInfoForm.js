Ext.define('MdPartInfoModule.view.MdPartInfoForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mdpartinfoform',
	
    border: false, // 不显示边线
    defaults: { // 组件的默认样式配置
    	xtype: 'textfield',
        labelWidth: 90, // label的默认宽度
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
        id: 'name',
        fieldLabel: '零件名称',
        name: 'cqadno',
        selectOnFocus: true,
        allowBlank: false
    }, {
        fieldLabel: '零件描述',
        name: 'cdesc',
        selectOnFocus: true,
        allowBlank: false
    }, {
        fieldLabel: '包装容量',
        name: 'cquantity',
        xtype: 'numberfield',
        step: 1,
        minValue: 1,
        selectOnFocus: true,
        allowBlank: false
    }, {
        xtype: 'combobox',
        fieldLabel: '客户',
        name: 'destinationId',
        id: "destination",
        store: Ext.create('MdPartInfoModule.store.Destination'),
        displayField: 'destination',
        valueField: 'id',
	    editable: false,
        allowBlank: false
    }, {
        xtype: 'checkbox',
        fieldLabel: '是否扫描',
        name: 'isscan',
        inputValue: 1,
        style: 'margin-top: 6px;'
    }]
});