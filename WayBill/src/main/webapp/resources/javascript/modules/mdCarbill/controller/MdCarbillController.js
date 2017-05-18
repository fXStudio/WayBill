Ext.define('MdCarbillModule.controller.MdCarbillController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'gridPanel', selector: 'mdcarbillgrid'},
       {ref: 'printsetPanel', selector: 'tfassnamegrid'},
       {ref: 'window', selector: 'mdcarbillwindow'},
       {ref: 'formPanel', selector: 'mdcarbillform'},
       {ref: 'submitBtn', selector: 'mdcarbillwindow button[action=submit]'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({
	        'tfassnamegrid': {
	    		select: function(view, record, item, index){
	    			var gridPanel = this.getGridPanel();
	    			var cache = Ext.data.StoreManager.lookup('cache');
	    			
	    			gridPanel.getStore().load({params: { cdescrip: record.data.cdescrip }}).on('load', function(){
    					Ext.getDom('selectedCount').innerHTML = cache.getCount();
    					
    					gridPanel.getSelectionModel().select(cache.getRange());
    				});
	    		}
	    	},
	        'mdcarbillgrid': {
	        	select: function(obj, record, index) {
	                var gridPanel = this.getGridPanel(), cache = Ext.data.StoreManager.lookup('cache');
	                
	        		if (record.get("car")) {
						Ext.Msg.show({
									title : '系统提示',
									msg : '该配货单已装载',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.WARNING
								});
						gridPanel.getSelectionModel().deselect(index);return;
					} else  if (record.get("pagenostate") != 1) {
					     Ext.Msg.confirm('系统提示', '该配货单没有总成匹配，确认装载吗?', function(_btn) {
    						 if (_btn !== "yes") {
    							   gridPanel.getSelectionModel().deselect(index);return;
    						} 
						});
	    			}
	    			cache.add(record);
	        		Ext.getDom('selectedCount').innerHTML = cache.getCount();
	        	},
	        	deselect: function(obj, record, index) {
	        		var cache = Ext.data.StoreManager.lookup('cache');
	        		cache.removeAt(cache.find('cpageno', record.data.cpageno));
	        		Ext.getDom('selectedCount').innerHTML = cache.getCount();
	        	}
	        },
	    	'button[action=add]':{
	    		click: function(){
	    			var cache = Ext.data.StoreManager.lookup('cache');
	            	var win = this.getWindow(), gridPanel = this.getGridPanel();
	            	
	            	// 判断窗体对象是否存在, 如果不存在，就创建一个新的窗体对象
	            	if(!win){win = Ext.create('MdCarbillModule.view.MdCarbillWindow');}
	            	// 在执行新增业务的时候，要把窗体的内容清空
	                this.getFormPanel().getForm().reset();
	                Ext.getCmp('door').getStore().reload();
	                Ext.getCmp('car').getStore().reload();

	            	
	            	if(cache.getCount()) {
	            		  var val = "";
	            		  var pagenos = "";
		            	  Ext.each(cache.getRange(), function(rec, index) {
		            		   val += "(" + (index + 1) + "). ";
		            		   val += rec.get('code') + " : ";
		            		   val += rec.get('cdescrip');
		            		   val += "\r\n";
		            		   
		            		   pagenos += rec.get('cpageno') + ",";
		            	  });
		            	  Ext.getCmp('items').setValue(val);
		            	  Ext.getCmp('pagenos').setValue(pagenos);
		            		
		                  win.show(); // 显示窗体
		                  win.center();// 窗体居中显示
	            	} else {
                		Ext.Msg.alert('警告', '未选择任何零件信息，无法执行装载指令');
	            	}
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
	                        url: 'services/carbillModify', // 请求的url地址  
	                        method: 'POST', // 请求方式  
	                        success: function(form, action) { // 添加数据成功后，重新加载数据源刷新表单 
	                        	Ext.data.StoreManager.lookup('cache').removeAll();
	                        	gridPanel.getStore().reload();
                        		Ext.Msg.alert('提示', '装载信息添加完成.');
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
	        'mdcarinfowindow': {
	        	show: function(){
    	            Ext.getCmp('car').focus(true, 100);
	        	}
	        }
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		Ext.create('Ext.data.Store', {
		    model: 'MdCarbillModule.model.MdCarbillModel',
		    storeId: 'cache'
		});
		
		var cache = Ext.data.StoreManager.lookup('cache');
		
		// 获得数据源对象
	    var printsetPanel = this.getPrintsetPanel(), store = printsetPanel.getStore();
	    var gridPanel = this.getGridPanel();
	    
        // 装载数据
        store.load();
        store.on('load', function() { 
        	printsetPanel.getSelectionModel().deselectAll();
        	gridPanel.getStore().removeAll();
        	cache.removeAll();
    		Ext.getDom('selectedCount').innerHTML = cache.getCount();
        });
	}
});