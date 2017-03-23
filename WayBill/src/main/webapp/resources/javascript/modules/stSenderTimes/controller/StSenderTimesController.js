Ext.define('StSenderTimesModule.controller.StSenderTimesController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'gridPanel', selector: 'stsendertimesgrid'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({
	    	'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("partno") && item.get("partno").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
	        'button[action=search]': {
	        	'click': function(){
		        	var gridPanel = this.getGridPanel(), store = gridPanel.getStore();
		        	
		        	store.load({params: {
		        		startDate: Ext.Date.format(gridPanel.down('datefield[name=startDate]').getValue(), 'Y-m-d H:i'),
		        		endDate: Ext.Date.format(gridPanel.down('datefield[name=endDate]').getValue(), 'Y-m-d H:i'),
		        		sender: gridPanel.down('checkbox[name=sender]').getValue(),
		        		order: gridPanel.down('checkbox[name=order]').getValue()
		        	}});
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
	    
	    store.load({params: {
    		startDate: Ext.Date.format(gridPanel.down('datefield[name=startDate]').getValue(), 'Y-m-d H:i'),
    		endDate: Ext.Date.format(gridPanel.down('datefield[name=endDate]').getValue(), 'Y-m-d H:i'),
    		sender: gridPanel.down('checkbox[name=sender]').getValue(),
    		order: gridPanel.down('checkbox[name=order]').getValue()
    	}});

	    // 设置首行选中
        store.on("load", function(){
        	gridPanel.getSelectionModel().deselectAll();
        	gridPanel.getSelectionModel().select(0);
        })
	}
});