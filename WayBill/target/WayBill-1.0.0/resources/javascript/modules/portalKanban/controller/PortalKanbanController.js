Ext.define('PortalKanbanModule.controller.PortalKanbanController', {
    extend: 'Ext.app.Controller',
    refs: [
           {ref: 'dooronegrid', selector: 'dooronegrid'},
           {ref: 'doortwogrid', selector: 'doortwogrid'},
           {ref: 'doorthreegrid', selector: 'doorthreegrid'},
           {ref: 'doorforthgrid', selector: 'doorforthgrid'}
    ],
    
    // Cotroller的业务处理
    init: function() {
	    this.control({
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		var me = this;
		(function(){
			var sel = arguments.callee;
			
			me.getDooronegrid().getStore().load({params: {doorno: '1号门'}});
			me.getDoortwogrid().getStore().load({params: {doorno: '2号门'}});
			me.getDoorthreegrid().getStore().load({params: {doorno: '3号门'}});
			me.getDoorforthgrid().getStore().load({params: {doorno: '4号门'}});
			
			setTimeout(function(){sel();}, 10000);
		})();
	}
});