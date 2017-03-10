Ext.define('ScanLocalClientModule.view.OrderpartGrid', {
	extend: 'Ext.form.Panel',
	alias: 'widget.orderpartgrid',

	border: false, // 不显示边线
    defaults: { // 组件的默认样式配置
    	xtype: 'displayfield',
        labelWidth: 65, // label的默认宽度
        labelAlign: 'left',
        anchor: "98%"
    },
    items: [{
        fieldLabel: 'id',
        name: 'id',
        hidden: true,
        hideLabel: true
    },{
        fieldLabel: '总成号',
        labelWidth: 50, 
        style: 'margin-top:3px;',
        labelStyle: 'margin-top:-2px;padding-left:3px;',
        fieldStyle:"font-size:12pt;margin-top:-2px;",
        name: 'partno'
    }, {
        fieldLabel: '订单号',
        labelWidth: 50, 
        labelStyle: 'margin-top:-8px;padding-left:3px;',
        fieldStyle:"font-size:12pt;margin-top:-8px;",
        name: 'orderno'
    }, {
        fieldLabel: '剩余/总数',
        labelStyle: 'margin-top:-15px;padding-left:3px;',
        fieldStyle:"font-size:12pt;margin-top:-15px;",
        name: 'leastCount'
    }, {
    	id: 'scanarea',
    	xtype: 'container',
    	layout: 'hbox',
    	style: 'margin-left:5px;margin-top:-22px;',
    	items:[ {
        	xtype: 'textareafield',
        	lable: '扫描信息',
        	flex: 1,
        	height: 70,
        	id: 'scancode',
        	style: 'margin-right: 5px;',
        	enableKeyEvents: true,
            selectOnFocus: true
        },{
        	xtype: 'checkbox',
        	labelWidth: 60,
        	fieldLabel: '自动回车',
        	value: true
        }]
    }, {
    	id: 'messagearea',
    	xtype: 'displayfield',
    	style: 'margin-left:5px;',
    	hidden: true,
    	flex: 1,
    	fieldStyle: 'color:red;font-weight:bolder;font-size:13pt;'
    }],
	
    /**
     * Component Init
     */
    initComponent: function() {
        var me = this;
        // Copy properties to Origin Object
        Ext.apply(this, {
            tbar: Ext.create('Ext.toolbar.Toolbar', {
                items: [ '<strong>MES单号: </strong><span id="mesno"></span><span id="partcount" style="margin-left:3px;font-weight:bolder;"></span>', '->',{
                	text: '返回主页',
                	action: 'backMain'
                }]
            }),
            bbar: Ext.create('Ext.toolbar.Toolbar', {
            	id: 'bootomBar',
                items: [{
                	xtype: 'button',
                	id: 'rollbackAll',
                	text: '撤销全部'
                }, {
                	xtype: 'button',
                	id: 'rollbackBtn',
                	text: '撤销'
                }, '->', {
                	xtype: 'container',
                	layout: 'hbox',
                	items: [{
                    	xtype: 'button',
                    	id: 'manalBtn',
                    	disabled: true,
                    	style: 'margin: 0 2px;',
                    	text: '手工确认'
                    }]
                }]
            })
        });
        this.callParent(arguments);
    }
});