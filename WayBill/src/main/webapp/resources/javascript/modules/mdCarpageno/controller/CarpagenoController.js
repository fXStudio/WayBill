Ext.define('MDCarpagenoModule.controller.CarpagenoController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'partGridPanel', selector: 'partgrid'},
       {ref: 'carGridPanel', selector: 'cargrid'},
       {ref: 'carWindow', selector: 'carinfowindow'},
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
	                                   item.get("doorno") && item.get("doorno").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
	        'button[action=print]': {
	        	click: function(){
	        		var gridPanel = this.getCarGridPanel(), partPanel = this.getPartGridPanel(), containerPartPanel = this.getContainerPartGridPanel(), parts = [], infos = [];
	        		var data = gridPanel.getSelectionModel().getLastSelected().data;
	        		
	        		partPanel.getStore().each(function(record, index) { parts.push(record.data); });
	        		containerPartPanel.getStore().each(function(record, index) {record.data.seqno = index + 1; infos.push(record.data); });
                    
                    Ext.Ajax.request({
	    			      url:"services/senderExport",
	    			      method: 'post',
	    			      params: {
	    			    	  sender: JSON.stringify(data),
	    			    	  parts: JSON.stringify(parts),
	    			    	  infos: JSON.stringify(infos)
	    			      },
	    			      success:function(res){
	    			          window.location.href = eval("(" + res.responseText + ")").path + "/" + Ext.util.Format.date(data.recorddate, 'Ymd-His');
	    			      }
	    			});
	    		}
	    	},
	        'button[action=submit]': {
	        	click: function(){
	                var gridPanel = this.getCarGridPanel(), me = this;
	                
	                if(gridPanel.getSelectionModel().selected.length){
	                	// 获得窗体对象的引用
		            	var win = this.getCarWindow();
		            	// 判断窗体对象是否存在, 如果不存在，就创建一个新的窗体对象
		            	if(!win){win = Ext.create('MDCarpagenoModule.view.CarInfoWindow');}
		            	
		            	Ext.getCmp('carinfogrid').getStore().load().on('load', function(){
		            		Ext.getCmp('carinfogrid').getSelectionModel().deselectAll();
		            	});
		            	
		                win.show(); // 显示窗体
		                win.center();// 窗体居中显示
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
		                Ext.MessageBox.confirm('取消装载', '确定要取消装载吗?', function(res) {
		                    if (res === 'yes') { // 用户确认要执行删除操作
				                Ext.Ajax.request({
			                         url: 'services/pagenoDel',
			                         params: {
			                        	 doorno: gridPanel.getSelectionModel().getSelection()[0].get('doorno')
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
            	doorno: record ? record.get("doorno") : '-1'
            }
        });
        this.getContainerPartGridPanel().getStore().load({
            params: {
            	doorno: record ? record.get("doorno") : '-1'
            }
        });
    }
});