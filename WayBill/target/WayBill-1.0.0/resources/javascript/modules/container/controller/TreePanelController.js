Ext.define('MainModule.controller.TreePanelController', {
    extend: 'Ext.app.Controller',

    stores: ['Tree'],
    
    refs: [
        {ref: 'treePanel', selector: 'maintreepanel'},
        {ref: 'tabPanel', selector: 'maintabpanel'}
    ],
	
    /**
     * Module Event Bind
     */
    init: function() {
	    this.control({
	    	'maintreepanel': {
        		'itemclick': function (view, record, item, index, e, option) {
                    if (record.get('leaf')) { 
                    	var tabPanel = this.getTabPanel();// TabPanel对象
                    	tabPanel.setTitle(record.get('text'));
                    	tabPanel.removeAll();
                    	tabPanel.add({
                            html: '<iframe src=' + record.get('url') + ' width="100%" height="100%"></iframe>'
                        })
                    }
                }
        	}
        })
    },
    
    /**
     * Module Launch
     */
	onLaunch: function() {
		// 获得数据源对象
	    var store = this.getTreeStore();
	    
	    // 设置数据源对象
	    this.getTreePanel().bindStore(store);
	    
        // 创建数据源的监听
	    store.on('load', function(records, successful, options) {
        	// 页面加载完成后去除等待窗体
            if (Ext.get('loading')) {
                setTimeout(function() {
                    Ext.get('loading').remove();
                    Ext.get('loading-mask').fadeOut({remove: true});
                }, 1 * 1000);
            }
        });
	}
});