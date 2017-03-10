Ext.define('PortalKanbanModule.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
          "PortalKanbanModule.view.DoorOneGrid",
          "PortalKanbanModule.view.DoorTwoGrid",
          "PortalKanbanModule.view.DoorThreeGrid",
          "PortalKanbanModule.view.DoorForthGrid"
    ],
    
    layout:'column',
    items: [{
        columnWidth: .25,
        xtype: 'dooronegrid'
    },{
        columnWidth: .25,
        xtype: 'doortwogrid'
    },{
        columnWidth: .25,
        xtype: 'doorthreegrid'
    },{
        columnWidth: .25,
        xtype: 'doorforthgrid'
    }]
});
