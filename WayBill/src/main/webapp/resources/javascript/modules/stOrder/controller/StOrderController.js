Ext.define('StOrderModule.controller.StOrderController', {
    extend: 'Ext.app.Controller',
    
    refs: [
           {ref: 'gridPanel', selector: 'ordergrid'},
           {ref: 'partPanel', selector: 'orderpartgrid'}
     ],
     init: function() {
 	    this.control({
 	    	'textfield[name=searchField]': {
	            specialkey: function(field, e){
	                if (e.getKey() == e.ENTER) {
	                    var gridPanel = this.getGridPanel();
	                    gridPanel.getStore().filter({
	                        filterFn: function(item) {
	                            return !field.getValue() || 
	                                   item.get("orderno") && item.get("orderno").indexOf(field.getValue()) > -1; 
	                        }
	                    });
	                }
	            }
	        },
	        'ordergrid': {
	    		select: function(view, record, item, index){
					this.getPartPanel().getStore().load({params: { orderid: record.data.id }});
	    		},
	    		filterchange: function() {
	    			this.getPartPanel().getStore().removeAll();
	    		}
	    	},
	    	'orderpartgrid tool[type=maximize]': {
	    		click: function(){
    			   var c = this.getPartPanel();
    			   var order = this.getGridPanel().getSelectionModel().getLastSelected();
    			   var kanbanOrder = Ext.create('StOrderModule.store.Order');
    			         
    			   if(order) { kanbanOrder.add(order); }
    			    
    			   var win = new Ext.window.Window({
    				   rtl: false,
    				   baseCls: "x-panel",
    				   maximized: true,
    				   title: "运单看板",
    				   plain: true,
    				   autoScroll: false,
    				   layout: 'border',
    				   items:[Ext.create('StOrderModule.view.KanbanOrderGrid', {
	    					   store: kanbanOrder,
	    					   region: 'north'
					   }), Ext.create('StOrderModule.view.KanbanPartGrid', {
        					   store: c.getStore(),
        					   region: 'center'
    				   })],
    				   closable:false,
    				   tools:[{type:"close", handler:function(){
    					   win.hide(c, function(){ win.destroy() })}
    				   }]
    			   });
    			   win.show();
	    		}
	    	}
 	    })
     },

     /**
      * Module Launch
      */
	 onLaunch: function() {
		    // 获得数据源对象
		    var me = this, gridPanel = this.getGridPanel(), store = gridPanel.getStore();
		    store.load();

		    // 设置首行选中
	        store.on("load", function(obj, records) {
	        	gridPanel.getSelectionModel().deselectAll();
				me.getPartPanel().getStore().removeAll();
	        	gridPanel.getSelectionModel().select(0);
	        })
	 }
});