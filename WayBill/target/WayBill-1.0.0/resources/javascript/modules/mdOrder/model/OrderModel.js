Ext.define('MdOrderModule.model.OrderModel', {
    extend: 'Ext.data.Model',
    
    fields: [
             'id', 'orderno', 'destination', 'car', 'ordertype', 'sendDate'
    ]
}); 