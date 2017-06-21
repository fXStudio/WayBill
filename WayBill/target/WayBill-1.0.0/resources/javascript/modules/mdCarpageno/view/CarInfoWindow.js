Ext.define('MDCarpagenoModule.view.CarInfoWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.carinfowindow',
	
	id: 'carinfowindow',
	title: '车辆信息',
    iconCls: 'feed-icon',
    resizable: false,
    modal: true,
    width: 560,
    y: 100,
    closeAction: 'hide',
    items: Ext.create('MDCarpagenoModule.view.CarInfoGrid', {id: 'carinfogrid',height: 300}),
    buttons: [{
        text: '提交',
        action: 'commit',
        listeners: {
        	click: function(){
        		var record = Ext.getCmp('carinfogrid').getSelectionModel().getLastSelected();
        		
        		if(!record) {
        			return Ext.MessageBox.alert('发货失败', '未选择车辆信息无法执行发货操作.');
        		}
        		Ext.Ajax.request({
                    url: 'services/pagenoModify',
                    params: {
                   	 	doorno: Ext.getCmp('cargrid').getSelectionModel().getLastSelected().get('doorno'),
                   	 	car: record.get('car')
                    },
                    method: 'POST',
                    success: function(response, options) {
                			Ext.getCmp('cargrid').getStore().load();
                    		Ext.getCmp('carinfowindow').close();
                    		
                    		setTimeout(function(){
                    			Ext.MessageBox.alert('完成发货', '发货指令已执行');
                    		}, 300);
                    },
                    failure: function(response, action) {
                        Ext.MessageBox.alert('失败', '操作失败：' + (action.result.failureReason || '系统异常'));
                    }
              });
        	}
        }
    }, {
        text: '取消',
        action: 'cancelTerminal',
        listeners: {
        	click: function(){
        		Ext.getCmp('carinfowindow').close();
        	}
        }
    }]
});