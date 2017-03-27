Ext.define('StSenderModule.controller.StSenderController', {
    extend: 'Ext.app.Controller',
    refs: [
       {ref: 'gridPanel', selector: 'stsendergrid'}
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
	        'stsendergrid': {
	        	select: function(){
	        		this.getGridPanel().down('button[action=export]').setDisabled(false);
	        	},
	        	filterchange: function(){
	        		this.getGridPanel().down('button[action=export]').setDisabled(this.getGridPanel().getStore().getCount() === 0);
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
	        },
	        'button[action=export]': {
	        	'click': function(){
	        		var gridPanel = this.getGridPanel(), meta = [], data = [];
	        		
	        		// statistics grid panel meta data.
	        		Ext.each(gridPanel.columns, function(col, index){ if(col.dataIndex) {meta.push(col.text);} });
	        		// statistics grid panel records.
	        		gridPanel.getStore().each(function(rec){ data.push(rec.data); });
	        		
	    			Ext.Ajax.request({
	    			      url:"services/exportData",
	    			      method: 'post',
	    			      params: {
	    			    	  meta: JSON.stringify(meta),
	    			    	  data: JSON.stringify(data)
	    			      },
	    			      success:function(res){
	    			          window.location.href = eval("(" + res.responseText + ")").path;
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
		// 获得数据源对象
	    var gridPanel = this.getGridPanel(), store = gridPanel.getStore();

	    // 设置首行选中
        store.on("load", function(){
        	gridPanel.down('button[action=export]').setDisabled(true);
        	
        	gridPanel.getSelectionModel().deselectAll();
        	gridPanel.getSelectionModel().select(0);
        })
	}
});