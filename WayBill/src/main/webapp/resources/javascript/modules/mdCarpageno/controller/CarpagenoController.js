Ext.define('MDCarpagenoModule.controller.CarpagenoController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'partGridPanel', selector: 'partgrid'},
       {ref: 'carGridPanel', selector: 'cargrid'},
       {ref: 'containerPartGridPanel', selector: 'containerpartgrid'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({ 'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getCarGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("car") && item.get("car").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
	        'button[action=print]': {
	        	click: function(){
	        		var gridPanel = this.getCarGridPanel(), partPanel = this.getPartGridPanel(), containerPartPanel = this.getContainerPartGridPanel(), parts = [], infos = [];
	        		
	        		partPanel.getStore().each(function(record, index) { parts.push(record.data); });
	        		containerPartPanel.getStore().each(function(record, index) {record.data.seqno = index + 1; infos.push(record.data); });
                    Ext.getDom('JrPrt').printSender(
                    		JSON.stringify(gridPanel.getSelectionModel().getLastSelected().data), 
                    		JSON.stringify(parts), 
                    		JSON.stringify(infos)
            		);
	    		}
	    	},
	        'button[action=submit]': {
	        	click: function(){
	                var gridPanel = this.getCarGridPanel(), me = this;
	                
	                if(gridPanel.getSelectionModel().selected.length){
	                	 // 提示用户确认删除操作
		                Ext.MessageBox.confirm('确认删除', '要提交车辆已发出确认吗?', function(res) {
		                    if (res === 'yes') { // 用户确认要执行删除操作
				                Ext.Ajax.request({
			                         url: 'services/pagenoModify',
			                         params: {
			                        	 car: gridPanel.getSelectionModel().getSelection()[0].get('car')
			                         },
			                         method: 'POST',
			                         success: function(response, options) {
		                         			var store = gridPanel.getStore();
		                         			
		                         			store.load();
		                         			store.on("load", function(obj, records){
		                         	        	gridPanel.getSelectionModel().select(0);
		                         	        	me.reloadSubViews(records[0]);
		                         	        });
			                         },
			                         failure: function(response, action) {
			                             Ext.MessageBox.alert('失败', '操作失败：' + (action.result.failureReason || '系统异常'));
			                         }
			                   });
		                    }
		                });
	                } else {
	                	Ext.MessageBox.alert('警告', '没有选中任何车辆信息');
	                }
	        	}
	        },
	        'button[action=cancel]': {
	        	click: function(){
	                var gridPanel = this.getCarGridPanel(), me = this;
	                
	                if(gridPanel.getSelectionModel().selected.length){
	                	 // 提示用户确认删除操作
		                Ext.MessageBox.confirm('确认删除', '确定要取消装载吗?', function(res) {
		                    if (res === 'yes') { // 用户确认要执行删除操作
				                Ext.Ajax.request({
			                         url: 'services/pagenoDel',
			                         params: {
			                        	 car: gridPanel.getSelectionModel().getSelection()[0].get('car')
			                         },
			                         method: 'POST',
			                         success: function(response, options) {
		                         			var store = gridPanel.getStore();
		                         			
		                         			store.load();
		                         			store.on("load", function(obj, records){
		                         	        	gridPanel.getSelectionModel().select(0);
		                         	        	me.reloadSubViews(records[0]);
		                         	        });
		                         			Ext.MessageBox.alert('提示', '撤销装载完成');
			                         },
			                         failure: function(response, action) {
			                             Ext.MessageBox.alert('失败', '操作失败：' + (action.result.failureReason || '系统异常'));
			                         }
			                   });
		                    }
		                });
	                } else {
	                	Ext.MessageBox.alert('警告', '没有选中任何车辆信息');
	                }
	        	}
	        },
	        'cargrid': {
	        	itemclick: function(obj, record, e) {
	            	this.reloadSubViews(record);
	            },
	            select: function(){
	            	this.getCarGridPanel().down('button[action=print]').setDisabled(false);
	            }
	        }
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		// 获得数据源对象
	    var me = this, gridPanel = me.getCarGridPanel(), store = gridPanel.getStore();
	    
        // 装载数据
        store.load();

	    // 设置首行选中
        store.on("load", function(obj, records){
        	gridPanel.down('button[action=print]').setDisabled(true);
        	gridPanel.getSelectionModel().deselectAll();
        	gridPanel.getSelectionModel().select(0);
        	me.reloadSubViews(records[0]);
        });
	},
	// 数据集合默认选中第一行
    reloadSubViews: function(record) { 
        this.getPartGridPanel().getStore().load({
            params: {
            	car: record ? record.get("car") : '-1'
            }
        });
        this.getContainerPartGridPanel().getStore().load({
            params: {
            	car: record ? record.get("car") : '-1'
            }
        });
    }
});