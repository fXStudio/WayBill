Ext.define('MdCarInfoModule.view.MdCarInfoForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mdcarinfoform',
	
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
        id: 'car',
        fieldLabel: '车牌号',
        name: 'car',
        maxLength: 7,
        selectOnFocus: true,
        allowBlank: false
    }, {
        fieldLabel: '目的地',
        name: 'destination',
        selectOnFocus: true,
        allowBlank: false
    }, {
        fieldLabel: '备注',
        name: 'remark',
        selectOnFocus: true,
        allowBlank: false
    }]
});