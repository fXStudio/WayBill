Ext.define('MdDestinationModule.view.MdDestinationForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mddestinationform',
	
    border: false, // 不显示边线
    defaults: { // 组件的默认样式配置
    	xtype: 'textfield',
        labelWidth: 50, // label的默认宽度
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
        fieldLabel: '名称',
        name: 'destination',
        maxLength: 7,
        selectOnFocus: true,
        allowBlank: false
    }, Ext.create('Ext.form.ComboBox', {
        fieldLabel: '描述',
        labelWidth: 50, // label的默认宽度
        labelAlign: 'right',
        store: Ext.create('Ext.data.Store', {
        	autoLoad: true,
            fields: ['id', 'name'],
            data : [
                {"id": "1", "name": "长春"},
                {"id": "2", "name": "外埠"}
            ]
        }),
        name: 'dtype',
        displayField: 'name',
        valueField: 'name'
    })]
});