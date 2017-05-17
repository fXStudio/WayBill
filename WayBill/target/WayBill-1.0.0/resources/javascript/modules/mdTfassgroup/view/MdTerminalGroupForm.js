Ext.define('MdTfassGroupModule.view.MdTerminalGroupForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mdterminalgroupform',
	
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
        name: 'groupName',
        selectOnFocus: true,
        allowBlank: false
    }, {
        fieldLabel: '描述',
        name: 'remark',
        selectOnFocus: true,
        allowBlank: true
    }]
});