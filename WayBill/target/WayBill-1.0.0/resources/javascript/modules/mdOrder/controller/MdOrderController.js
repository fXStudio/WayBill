Ext.define('MdOrderModule.controller.MdOrderController', {
    extend: 'Ext.app.Controller',
    
    refs: [
           {ref: 'gridPanel', selector: 'ordergrid'},
           {ref: 'partPanel', selector: 'orderpartgrid'},
           {ref: 'window', selector: 'mdorderwindow'},
           {ref: 'terminalWindow', selector: 'terminalpartinfowindow'},
           {ref: 'formPanel', selector: 'mdorderform'},
           {ref: 'orderid', selector: 'textfield[name=orderid]'}
     ],
     init: function() {
 	    this.control({
 	    	'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                var gridPanel = this.getGridPanel();
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("orderno") && item.get("orderno").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                    gridPanel.getSelectionModel().deselectAll();
	                    gridPanel.getSelectionModel().select(0);
	                }
	            }
	        },
	        'ordergrid': {
	    		select: function(view, record, item, index){
                    var gridPanel = this.getGridPanel();
    				this.getOrderid().setValue(record.data.id);
    				this.getPartPanel().getStore().load({params: { orderid: record.data.id }});
    				
    	        	Ext.getCmp('addBtn').setDisabled(false);
	    		},
	    		filterchange: function() {
	    			this.getPartPanel().getStore().removeAll();
	    		}
	    	},
	        'button[action=send]': {
	        	click: function(){
	        		var gridObj = this.getGridPanel();
	                var sm = this.getGridPanel().getSelectionModel();// 获得grid的SelectionModel
	                
	                // 如果选中行无效，则不相应用户的删除操作
	                if (sm.getSelection().length < 1) {
	                    return false;
	                }
	                
	                Ext.MessageBox.confirm('确认发运', '要提交订单发运状态吗?', function(res) {
	                    if (res === 'yes') { // 用户确认要执行删除操作
	                        Ext.Ajax.request({
	                            url: 'services/orderSend',
	                            params: { id: sm.getLastSelected().get('id') },
	                            method: 'POST',
	                            success: function(response, options) {
                                    gridObj.getStore().reload();
                                    Ext.Msg.alert('确认发运', '已确认发运订单');
	                            },
		                        failure: function(form, action) { // 添加失败后，提示用户添加异常
		                        	try{
		                        		Ext.Msg.alert('失败', '操作未完成，原因：' + action.result.failureReason);
		                        	} catch(e){
		                        		Ext.Msg.alert('失败', '操作未完成，原因：程序错误，请查看运行日志.');
		                        	}
		                        }
	                        });
	                    }
	                });
	    		}
	    	},
	        'button[action=print]': {
	        	click: function(){
	        		var gridPanel = this.getGridPanel(),  partPanel = this.getPartPanel(),  parts = [];
	        		var data = gridPanel.getSelectionModel().getLastSelected().data;
	        		
	        		partPanel.getStore().each(function(record, index) {record.data.id = index + 1;  parts.push(record.data); });
                    
                    Ext.Ajax.request({
	    			      url:"services/kanbanExport",
	    			      method: 'post',
	    			      params: {
	    			    	  order: JSON.stringify(data),
	    			    	  parts: JSON.stringify(parts)
	    			      },
	    			      success:function(res){
	    			          window.location.href = eval("(" + res.responseText + ")").path + "/" + data.orderno;
	    			      }
	    			});
	    		}
	    	},
	    	'button[action=addPart]':{
	    		click: function(){
	    			// 获得窗体对象的引用
	            	var win = this.getTerminalWindow();
	            	// 判断窗体对象是否存在, 如果不存在，就创建一个新的窗体对象
	            	if(!win){win = Ext.create('MdOrderModule.view.TerminalPartInfoWindow');}
	            	
	            	var orderid = this.getGridPanel().getSelectionModel().getLastSelected().data.id;
	            	var destinationid = this.getGridPanel().getSelectionModel().getLastSelected().data.destination;
	            	
	            	Ext.getCmp('terminalpartinfogrid').getStore().load({
	            		params: { 
	            			orderid: orderid,
	            			destinationid: destinationid
	            		}
	            	});
	            	Ext.getCmp('terminalpartinfogrid').getStore().on('load', function(){
	            		Ext.getCmp('terminalpartinfogrid').getSelectionModel().deselectAll();
	            	});
	                win.show(); // 显示窗体
	                win.center();// 窗体居中显示
	            }
	        },
	    	'button[action=add]':{
	    		click: function(){
	    			// 获得窗体对象的引用
	            	var win = this.getWindow();
	            	// 判断窗体对象是否存在, 如果不存在，就创建一个新的窗体对象
	            	if(!win){win = Ext.create('MdOrderModule.view.MdOrderWindow');}
	            	// 在执行新增业务的时候，要把窗体的内容清空
	                this.getFormPanel().getForm().reset();
	                
	                win.show(); // 显示窗体
	                win.center();// 窗体居中显示
	            }
	        },
	        'button[action=modify]': {
	        	click: function(){
	                var sm = this.getGridPanel().getSelectionModel();// 获得grid的SelectionModel
	                var record = sm.getLastSelected();// 当前选中记录

	                // 只有存在选中行的时候才显示修改窗口
	                if (record) {
		            	var win = this.getWindow();
	                	if(!win){win = Ext.create('MdOrderModule.view.MdOrderWindow');}
	                	this.getFormPanel().getForm().loadRecord(record); // 加载要编辑的对象
	                	
	                	var combox = Ext.getCmp('destination');
	                	combox.getStore().load().on('load', function(){
		                	combox.getStore().each(function(item, index){
		                		if(record.data.destination === '' + item.data.id) {
		                			combox.setValue(item.data.id);
		                			
		                			return false;
		                		}
		                	});
	                	});
	                	win.show(); // 显示窗体
	                	win.center();
	                }
	            }
	        },
	        'button[action=del]': {
	        	click: function(){
	                var gridObj = this.getGridPanel();
	                var sm = this.getGridPanel().getSelectionModel();// 获得grid的SelectionModel
	                
	                // 如果选中行无效，则不相应用户的删除操作
	                if (sm.getSelection().length < 1) {
	                    return false;
	                }

	                // 提示用户确认删除操作
	                Ext.MessageBox.confirm('确认删除', '你确定要删除选中记录吗?', function(res) {
	                    if (res === 'yes') { // 用户确认要执行删除操作
	                        Ext.Ajax.request({
	                            url: 'services/orderDel',
	                            params: { id: sm.getLastSelected().get('id') },
	                            method: 'POST',
	                            success: function(response, options) {
                                    gridObj.getStore().reload();
	                            },
		                        failure: function(form, action) { // 添加失败后，提示用户添加异常
		                        	try{
		                        		Ext.Msg.alert('失败', '操作未完成，原因：' + action.result.failureReason);
		                        	} catch(e){
		                        		Ext.Msg.alert('失败', '操作未完成，原因：程序错误，请查看运行日志.');
		                        	}
		                        }
	                        });
	                    }
	                });
	            }
	        },
	        'button[action=submit]': {
	        	click: function(){
	                var formObj = this.getFormPanel().getForm();
	                var window = this.getWindow();
	                var gridPanel = this.getGridPanel();
	                
	                // 检查表单项的录入是否存在问题
	                if (formObj.isValid()) {
	                    formObj.submit({
	                        waitMsg: '数据正在处理请稍后', // 提示信息  
	                        waitTitle: '提示', // 标题  
	                        url: 'services/orderModify', // 请求的url地址  
	                        method: 'POST', // 请求方式  
	                        success: function(form, action) { // 添加数据成功后，重新加载数据源刷新表单 
	                        	gridPanel.getStore().reload();
	                        },
	                        failure: function(form, action) { // 添加失败后，提示用户添加异常
	                        	try{
	                        		Ext.Msg.alert('失败', '操作未完成，原因：' + action.result.failureReason);
	                        	} catch(e){
	                        		Ext.Msg.alert('失败', '操作未完成，原因：程序错误，请查看运行日志.');
	                        	}
	                        }
	                    });
	                    // 关闭当前弹出窗
	                    setTimeout(function() {window.hide();}, 100);
	                }
	        	}
	        },
	        'button[action=cancel]': {
	        	click: function(){
	        		this.getWindow().hide();
	        	}
	        },
	        'button[action=cancelTerminal]': {
	        	click: function(){
	        		this.getTerminalWindow().hide();
	        	}
	        },
	        'mdorderwindow': {
	        	show: function(){
    	            Ext.getCmp('destination').focus(true, 100);
	        	}
	        },
	        'button[action=commit]': {
	        	click: function(){
	               var window = this.getTerminalWindow();
	               var gridPanel = this.getPartPanel();
	        	   var orderId = this.getGridPanel().getSelectionModel().getLastSelected().data.id;
	               var arr = [];
	               Ext.each(Ext.getCmp('terminalpartinfogrid').getSelectionModel().getSelection(), function(record){
	            	   arr.push(record.data);
	               });
	               
	               Ext.Ajax.request({
                       url: 'services/orderpartModify',
                       params: { orderId: orderId,  parts: JSON.stringify(arr) },
                       method: 'POST',
                       success: function(response, options) {
                    	   gridPanel.getStore().reload();
                       },
                       failure: function(form, action) { // 添加失败后，提示用户添加异常
                       	try{
                       		Ext.Msg.alert('失败', '操作未完成，原因：' + action.result.failureReason);
                       	} catch(e){
                       		Ext.Msg.alert('失败', '操作未完成，原因：程序错误，请查看运行日志.');
                       	}
                       }
                   });
                   // 关闭当前弹出窗
                   setTimeout(function() {window.hide();}, 100);
	            }
	        }
 	    })
     },

     /**
      * Module Launch
      */
	 onLaunch: function() {
		    // 获得数据源对象
		    var me = this, gridPanel = this.getGridPanel(), partPanel = this.getPartPanel(), store = gridPanel.getStore();
		    
		    store.load({params: {
		    	status: '已创建未扫描'
		    }}).on("load", function(obj, records){
	        	gridPanel.getSelectionModel().deselectAll();
	        	partPanel.getStore().removeAll();
	        	Ext.getCmp('addBtn').setDisabled(true);
	        	
	        	gridPanel.down('button[action=modify]').setDisabled(!records.length);
	        	gridPanel.down('button[action=del]').setDisabled(!records.length);
	        	gridPanel.down('button[action=print]').setDisabled(!records.length);
	        	gridPanel.down('button[action=send]').setDisabled(!records.length);
	        	
	        	gridPanel.getSelectionModel().select(0);
	        })
	 }
});