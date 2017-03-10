Ext.define('STSendCompModule.controller.SendCompController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'pagepartGridPanel', selector: 'pagepartgrid'},
       {ref: 'sendcompGridPanel', selector: 'sendcompgrid'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({ 'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getSendcompGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("pageno") && item.get("pageno").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
	        'sendcompgrid': {
	        	itemclick: function(obj, record, e) {
	            	this.reloadSubViews(record);
	            }
	        }
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		// 获得数据源对象
	    var me = this, gridPanel = me.getSendcompGridPanel(), store = gridPanel.getStore();
	    
        // 装载数据
        store.load();

	    // 设置首行选中
        store.on("load", function(obj, records){
        	gridPanel.getSelectionModel().deselectAll();
        	gridPanel.getSelectionModel().select(0);
        	me.reloadSubViews(records[0]);
        });
	},
	// 数据集合默认选中第一行
    reloadSubViews: function(record) { 
        // 检查记录是否存在
        if (record) {
            this.getPagepartGridPanel().getStore().load({
                params: {
                	pageno: record.get("pageno")
                }
            });
        }
    }
});