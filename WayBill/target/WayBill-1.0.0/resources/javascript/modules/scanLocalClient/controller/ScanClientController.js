Ext.define('ScanLocalClientModule.controller.ScanClientController', {
    extend: 'Ext.app.Controller',
    stores: ["Orderpart"],
    refs: [
       {ref: 'gridPanel', selector: 'scanclientgrid'},
       {ref: 'partPanel', selector: 'orderpartgrid'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({
	        'scanclientgrid': {
	    		itemclick: function(view, record, item, index){
	    			var me = this, gridPanel = this.getGridPanel(), partPanel = this.getPartPanel();
	    			partPanel.getForm().reset();
	    			
	    	        this.getOrderpartStore().load({params: { orderid: record.data.id }}).on('load', 
    	        		function(obj, records){
	    	        	    if(records.length > 0) {
		    	        		gridPanel.hide();
		    	        		var partrec = records[0];
		    	        		
		    	        		partrec.data.leastCount = partrec.data.totalcount + '/' + partrec.data.pkgquantity;
			    	        	partPanel.show().getForm().loadRecord(partrec); // 加载要编辑的对象
				    			
				    			Ext.getDom('mesno').innerHTML = record.data.id;
				    			Ext.getDom('partcount').innerHTML = "(" + records.length + ")";
				    			partPanel.down('#scancode').setValue(null).focus();
				    			
				    			if(partrec.data.isscan === 0) {
				    				partPanel.down('#scancode').setValue(parseInt(Math.random() * 100000) + '' + partrec.data.id + '|NOSCAN' + '|' + partrec.data.partno + '|||' + partrec.data.totalcount + '||||')
				    				partPanel.down('#manalBtn').setDisabled(false);
					    			partPanel.down('#scanarea').setDisabled(true);
				    			} else {
				    				partPanel.down('#manalBtn').setDisabled(true);
					    			partPanel.down('#scanarea').setDisabled(false);
				    			}
	    	        	    } else {
	                    		me.showMessage(partPanel, '已全部扫描完成，稍后页面会自动跳转', true, function() {
	                    			    gridPanel.getStore().load();
		                    			partPanel.hide();
				    	        		gridPanel.show();
	                    		});
	    	        	    }
		    			}
	    	        );
	    		}
	    	},
	    	'button[action=backMain]':{
	    		click: function(){
	    			var gridPanel = this.getGridPanel(), partPanel = this.getPartPanel();
	    			
	    			gridPanel.getStore().reload();
	            }
	        },
	        '#scancode': {
	        	keypress: function(field, e){
	        		if (this.getPartPanel().down('#manalBtn').isDisabled() && e.keyCode == 13) {
	                	this.handle(field);
	                }
        		}
	        },
	        '#scanarea checkbox': {
	        	change: function(obj, newvalue, oldvalue) {
	        		var me = this.getPartPanel();

        			me.down('#manalBtn').setDisabled(newvalue);
	    			me.down('#scancode').focus();
	        	}
	        },
	        '#manalBtn': {
	        	click: function() {
	        		this.handle( this.getPartPanel().down('#scancode'));
	        	}
	        },
	        '#rollbackBtn': {
	        	click: function() {
	        		var me = this;
	        		
	                Ext.MessageBox.confirm('确认撤销', '确定要执行撤销操作吗?', function(res) {
	                    if (res === 'yes') {
	                		var partPanel = me.getPartPanel(), mask = new Ext.LoadMask(partPanel, {msg:"数据处理中请稍后......"}).show();
	                		
	                    	 Ext.Ajax.request({
	                             url: 'services/scanRollback',
	                             params: {orderId: Ext.getDom('mesno').innerHTML},
	                             method: 'POST',
	                             success: function(response, options) {
	                            	var feedback = eval('(' + response.responseText + ')');
	                            	
	                            	if(!feedback.success) {
	                            		me.showMessage(partPanel, feedback.failureReason);
	                            	} else {
	                            		me.showMessage(partPanel, '撤销指令已执行', true);
	                            	}
	                            	mask.hide();
	                             },
	                             failure: function(response, action) {
	                  	             mask.hide();
	                                 Ext.MessageBox.alert('系统错误. 请联系管理员');
	                             }
	                        });
	                		return;
	                	}
	                });
                }
	        },
	        '#rollbackAll': {
	        	click: function() {
	        		var me = this;
	        		
	                Ext.MessageBox.confirm('确认撤销', '确定要撤销该订单的全部操作吗?', function(res) {
	                    if (res === 'yes') {
	                		var partPanel = me.getPartPanel(), mask = new Ext.LoadMask(partPanel, {msg:"数据处理中请稍后......"}).show();
	                		
	                    	 Ext.Ajax.request({
	                             url: 'services/scanRollbackAll',
	                             params: {orderId: Ext.getDom('mesno').innerHTML},
	                             method: 'POST',
	                             success: function(response, options) {
	                            	var feedback = eval('(' + response.responseText + ')');
	                            	
	                            	if(!feedback.success) {
	                            		me.showMessage(partPanel, feedback.failureReason);
	                            	} else {
	                            		me.showMessage(partPanel, '撤销指令已执行', true);
	                            	}
	                            	mask.hide();
	                             },
	                             failure: function(response, action) {
	                  	             mask.hide();
	                                 Ext.MessageBox.alert('系统错误. 请联系管理员');
	                             }
	                        });
	                		return;
	                	}
	                });
                }
	        }
	    })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		var gridPanel = this.getGridPanel(), partPanel = this.getPartPanel();
	    this.getGridPanel().getStore().load({params: {dtype:'本地'}}).on('load', function(){
	    	gridPanel.show();
	    	partPanel.hide();
	    	Ext.getCmp('searchField').focus();
	    });
	},  
	
	 /**
     * 显示异常信息
     */
	showMessage: function(me, msg, success, func) {
		var selfobj = this;
    	var msgcomp = me.down('#messagearea').setValue(msg).show();
    	var scancomp = me.down('#scanarea').hide();
    	
    	msgcomp.setFieldStyle(success ? 'color:green' : 'color:red');
    	
    	// 设置按钮的状态(用一个临时属性来保存按钮的原始状态，以能够实现还原)
    	Ext.each(me.query('button'), function(btn) { btn.setDisabled(true | (btn.state = btn.isDisabled())); });
    	// 提示信息自动隐藏
    	setTimeout(function() {
    		scancomp.show(); msgcomp.hide();
    		Ext.each(me.query('button'), function(btn) { btn.setDisabled(btn.state); });
    		me.down('#scancode').focus();
    		
    		if(func) { func(); }
    		else if(success) { selfobj.getOrderpartStore().reload() }
    	}, 1000);
    }, 

	 /**
    * 处理扫描逻辑
    */
    handle: function(field){
		var partPanel = this.getPartPanel();
		
    	if(field.getValue().indexOf(partPanel.down('displayfield[name=partno]').getValue()) != -1) {
    		var me = this, mask = new Ext.LoadMask(partPanel, {msg:"数据处理中请稍后......"}).show();
    		
 		    Ext.Ajax.request({
                 url: 'services/scanCommit',
                 params: {val: field.getValue() + '|' + partPanel.down('displayfield[name=id]').getValue()},
                 method: 'POST',
                 success: function(response, options) {
                	var feedback = eval('(' + response.responseText + ')');
                	
                	if(!feedback.success) {
                		me.showMessage(partPanel, feedback.failureReason);
                	} else {
                		me.showMessage(partPanel, '扫描完成: 正在重新计算待扫数量', true);
                	}
                	mask.hide();
                 },
                 failure: function(response, action) {
      	             mask.hide();
                     Ext.MessageBox.alert('系统错误. 请联系管理员');
                 }
            });
    		return;
    	}
    	this.showMessage(partPanel, '扫描失败: 无效的总成号');
    }
});