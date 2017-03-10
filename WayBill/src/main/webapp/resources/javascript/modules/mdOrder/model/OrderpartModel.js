Ext.define('MdOrderModule.model.OrderpartModel', {
    extend: 'Ext.data.Model',
    
    fields: [
             {name: 'id', type: 'int', defaultValue: 0}, 'partno', 'pkgcount', 
             'totalcount', 'orderid', 'pkgquantity', 'orderno', 'partdesc', 'isscan'
    ]
}); 