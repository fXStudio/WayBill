Ext.define('MdDestinationModule.controller.MdDestinationController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'gridPanel', selector: 'mddestinationgrid'},
       {ref: 'window', selector: 'mddestinationwindow'},
       {ref: 'formPanel', selector: 'mddestinationform'},
       {ref: 'submitBtn', selector: 'mddestinationwindow button[action=submit]'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("destination") && item.get("destination").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
            'textfield[name=remark]': {// 密码项目的事件处理
            	specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        this.getSubmitBtn().getEl().dom.click();
                    }
                }
            },
	    	'button[action=add]':{
	    		click: function(){
	    			// 获得窗体对象的引用
	            	var win = this.getWindow();
	            	// 判断窗体对象是否存在, 如果不存在，就创建一个新的窗体对象
	            	if(!win){win = Ext.create('MdDestinationModule.view.MdDestinationWindow');}
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
	                	if(!win){win = Ext.create('MdDestinationModule.view.MdDestinationWindow');}
	                	this.getFormPanel().getForm().loadRecord(record); // 加载要编辑的对象
	                	
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
	                            url: 'services/destDel',
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
	                        url: 'services/destModify', // 请求的url地址  
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
	        'mddestinationwindow': {
	        	show: function(){
    	            Ext.getCmp('name').focus(true, 100);
	        	}
	        }
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		// 获得数据源对象
	    var gridPanel = this.getGridPanel(), store = gridPanel.getStore();
	    
        // 装载数据
        store.load();

	    // 设置首行选中
        store.on("load", function(){
        	gridPanel.getSelectionModel().deselectAll();
        	gridPanel.getSelectionModel().select(0);
        })
	}
});